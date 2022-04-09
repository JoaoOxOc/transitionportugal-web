using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Enums;
using CommonLibrary.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Text.Json;
using UserService.Entities;
using UserService.Models;
using UserService.Services.Database;
using UserService.Services.UserManager;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScopeController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _configuration;
        private readonly IRoleScopeManager _roleScopeManager;

        public ScopeController(IUnitOfWork uow, IConfiguration configuration, IRoleScopeManager roleScopeManager)
        {
            _uow = uow;
            _configuration = configuration;
            _roleScopeManager = roleScopeManager;
        }

        private ObjectResult ValidateScope(Scope scope)
        {
            if (scope.ScopeName == null || string.IsNullOrWhiteSpace(scope.ScopeName.Trim())
                || scope.Description == null || string.IsNullOrWhiteSpace(scope.Description.Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }

            Expression<Func<Scope, bool>> filter = (x => x.Id != scope.Id && (x.ScopeName.ToLower().Equals(scope.ScopeName.ToLower()))
            );

            var existsScope = this._uow.ScopeRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
            if (existsScope != null)
            {
                ConflictModel conflict = new ConflictModel();
                conflict.ConflictType = ConflictType.DuplicateValue;
                conflict.Entity = typeof(Scope).Name;

                if (existsScope.ScopeName.ToLower() == scope.ScopeName.ToLower())
                {
                    conflict.Field = typeof(Scope).GetProperty("ScopeName").Name;
                }

                return Conflict(conflict);
            }

            return Ok(null);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string? searchText, int? offset, int? limit, string sort, string sortDirection)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" }))
            {
                try
                {
                    offset = offset ?? 1;

                    searchText = searchText == null ? string.Empty : searchText.Trim().ToLower();
                    sort = sort ?? "ScopeName";
                    SortDirection direction = sortDirection == "desc" ? SortDirection.Descending : SortDirection.Ascending;

                    Expression<Func<Scope, bool>> filter = (x => x.ScopeName.ToLower().Contains(searchText.ToLower()) || x.Description.Contains(searchText));

                    var _scopes = _uow.ScopeRepository.Get(offset, limit, filter, sort, direction, string.Empty);

                    int totalCount = _uow.ScopeRepository.Count(filter);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                    return _scopes != null ? Ok(new
                    {
                        scopes = _scopes
                    })
                    : NotFound(new List<Scope>());
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message + "| " + ex.StackTrace);
                }
            }
            return Forbid();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" }))
            {
                try
                {
                    var scope = _uow.ScopeRepository.GetById(id);

                    if (scope != null)
                    {
                        Expression<Func<RoleScope, bool>> filter = (x => x.ScopeId == scope.Id);
                        var scopeRoles = _uow.RoleScopeRepository.Get(null, null, filter, "Id", SortDirection.Ascending, "IdentityRole");

                        return Ok(new
                        {
                            scope = scope,
                            scopeRoles = scopeRoles
                        });
                    }
                    else
                    {
                        return NotFound(null);
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message + "| " + ex.StackTrace);
                }
            }
            return Forbid();
        }

        [Authorize]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] ScopeModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" }))
            {
                Scope scope = new()
                {
                    ScopeName = model.ScopeIdentifier,
                    Description = model.Description,
                };

                ObjectResult _validate = this.ValidateScope(scope);
                if (_validate.StatusCode != StatusCodes.Status200OK)
                {
                    return _validate;
                }

                _uow.ScopeRepository.Add(scope);
                _uow.Save();

                return Ok(new
                {
                    scopeId = scope.Id
                });
            }
            return Forbid();
        }

        [Authorize]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Put([FromBody] ScopeModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" }))
            {
                Expression<Func<Scope, bool>> filter = (x => x.ScopeName == model.ScopeIdentifier);

                var scope = this._uow.ScopeRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
                if (scope != null)
                {
                    scope.Description = model.Description;

                    ObjectResult _validate = this.ValidateScope(scope);
                    if (_validate.StatusCode != StatusCodes.Status200OK)
                    {
                        return _validate;
                    }

                    try
                    {
                        _uow.ScopeRepository.Update(scope);
                        _uow.Save();

                        _roleScopeManager.ReplaceScopeRoles(scope.Id, model.ScopeRoles);

                        return Ok(new
                        {
                            scopeId = scope.Id
                        });
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, null);
                    }
                }
                else
                {
                    return NotFound();
                }
            }
            return Forbid();
        }
    }
}
