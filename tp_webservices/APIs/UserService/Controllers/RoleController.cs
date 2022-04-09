using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Enums;
using CommonLibrary.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
    public class RoleController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IRoleScopeManager _roleScopeManager;

        public RoleController(IUnitOfWork uow, IConfiguration configuration, RoleManager<IdentityRole> roleManager, IRoleScopeManager roleScopeManager)
        {
            _uow = uow;
            _configuration = configuration;
            _roleManager = roleManager;
            _roleScopeManager = roleScopeManager;
        }

        private ObjectResult ValidateRole(IdentityRole role)
        {
            if (role.Name == null || string.IsNullOrWhiteSpace(role.Name.Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }

            Expression<Func<IdentityRole, bool>> filter = (x => x.Id != role.Id && (x.Name.ToLower().Equals(role.Name.ToLower()))
            );

            var existsRole = this._uow.IdentityRoleRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
            if (existsRole != null)
            {
                ConflictModel conflict = new ConflictModel();
                conflict.ConflictType = ConflictType.DuplicateValue;
                conflict.Entity = typeof(IdentityRole).Name;

                if (existsRole.Name.ToLower() == role.Name.ToLower())
                {
                    conflict.Field = typeof(IdentityRole).GetProperty("Name").Name;
                }

                return Conflict(conflict);
            }

            return Ok(null);
        }

        private RoleModel ParseEntityToModel(IdentityRole role, List<RoleScope> scopes)
        {
            RoleModel model = new RoleModel();
            model.RoleId = role.Id;
            model.NormalizedRoleName = role.NormalizedName;
            model.RoleName = role.Name;

            if (scopes != null)
            {
                model.Scopes = new List<ScopeModel>();
                foreach (var scope in scopes)
                {
                    model.Scopes.Add(new ScopeModel
                    {
                        ScopeId = scope.Scope.Id,
                        ScopeIdentifier = scope.Scope.ScopeName,
                        Description = scope.Scope.Description
                    });
                }
            }

            return model;
        }

        private List<RoleModel> ParseEntitiesToModel(List<IdentityRole> roles)
        {
            List<RoleModel> models = new List<RoleModel>();
            foreach (var role in roles)
            {
                models.Add(ParseEntityToModel(role, null));
            }
            return models;
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
                    sort = sort ?? "Name";
                    SortDirection direction = sortDirection == "desc" ? SortDirection.Descending : SortDirection.Ascending;

                    Expression<Func<IdentityRole, bool>> filter = (x => x.Name.ToLower().Contains(searchText.ToLower()));

                    var _roles = _uow.IdentityRoleRepository.Get(offset, limit, filter, sort, direction, string.Empty);

                    int totalCount = _uow.IdentityRoleRepository.Count(filter);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                    return _roles != null ? Ok(new
                    {
                        roles = ParseEntitiesToModel(_roles)
                    })
                    : NotFound(new List<RoleModel>());
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, null);
                }
            }
            return Forbid();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
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
                    var role = _uow.IdentityRoleRepository.GetById(id);
                    if (role != null)
                    {
                        Expression<Func<RoleScope, bool>> scopeFilter = (x => x.RoleId == role.Id);
                        var roleScopes = _uow.RoleScopeRepository.Get(null,null,scopeFilter, "Scope.ScopeName", SortDirection.Ascending, "Scope");

                        return Ok(new
                        {
                            role = ParseEntityToModel(role, roleScopes)
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
        public async Task<IActionResult> Register([FromBody] RoleModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" }))
            {
                IdentityRole role = new()
                {
                    Name = model.RoleName,
                    NormalizedName = !string.IsNullOrEmpty(model.NormalizedRoleName) ? model.NormalizedRoleName : model.RoleName.ToUpper(),
                };

                ObjectResult _validate = this.ValidateRole(role);
                if (_validate.StatusCode != StatusCodes.Status200OK)
                {
                    return _validate;
                }

                var creationResult = await _roleManager.CreateAsync(role);
                if (creationResult == null || !creationResult.Succeeded)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Role creation failed! Please check role details and try again." });

                var roleScopes = _roleScopeManager.ReplaceRoleScopes(role.Id, model.Scopes);

                return Ok(new
                {
                    roleId = role.Id,
                    scopes = roleScopes != null ? roleScopes.Select(x => x.ScopeId) : null
                });
            }
            return Forbid();
        }

        [Authorize]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Put([FromBody] RoleModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" }))
            {
                Expression<Func<IdentityRole, bool>> filter = (x => x.Id == model.RoleId);

                var role = this._uow.IdentityRoleRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
                if (role != null)
                {
                    role.Name = model.RoleName;
                    role.NormalizedName = !string.IsNullOrEmpty(model.NormalizedRoleName) ? model.NormalizedRoleName : model.RoleName.ToUpper();

                    ObjectResult _validate = this.ValidateRole(role);
                    if (_validate.StatusCode != StatusCodes.Status200OK)
                    {
                        return _validate;
                    }

                    try
                    {
                        var updateResult = await _roleManager.UpdateAsync(role);
                        if (updateResult == null || !updateResult.Succeeded)
                            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Role update failed! Please check role details and try again." });

                        var roleScopes = _roleScopeManager.ReplaceRoleScopes(role.Id, model.Scopes);

                        return Ok(new
                        {
                            roleId = role.Id,
                            scopes = roleScopes != null ? roleScopes.Select(x => x.ScopeId) : null
                        });
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message + "| " + ex.StackTrace);
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
