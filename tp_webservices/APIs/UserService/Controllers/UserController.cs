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
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _configuration;
        private readonly ITPUserManager _userManager;

        public UserController(IUnitOfWork uow, IConfiguration configuration, ITPUserManager userManager)
        {
            _uow = uow;
            _configuration = configuration;
            _userManager = userManager;
        }

        private ObjectResult ValidateUser(User user)
        {
            if (user.Name == null || string.IsNullOrWhiteSpace(user.Name.Trim()) ||
                user.UserName == null || string.IsNullOrWhiteSpace(user.UserName.Trim())
                || user.Email == null || string.IsNullOrWhiteSpace(user.Email.Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }

            Expression<Func<User, bool>> filter = (x => x.Id != user.Id && (x.UserName.Equals(user.UserName) || x.Email.Equals(user.Email))
            );

            var existsUser = this._uow.UserRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
            if (existsUser != null)
            {
                ConflictModel conflict = new ConflictModel();
                conflict.ConflictType = ConflictType.DuplicateValue;
                conflict.Entity = typeof(User).Name;

                if (existsUser.Name == user.Name)
                {
                    conflict.Field = typeof(User).GetProperty("Name").Name;
                }

                if (existsUser.UserName == user.UserName)
                {
                    conflict.Field = typeof(User).GetProperty("UserName").Name;
                }

                if (existsUser.Email == user.Email)
                {
                    conflict.Field = typeof(User).GetProperty("Email").Name;
                }

                return Conflict(conflict);
            }

            return Ok(null);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string? searchText, int? associationId, bool? isActive, bool? isVerified, int? offset, int? limit, string sort, string sortDirection)
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

                    Expression<Func<User, bool>> filter = (x => (x.Name.ToLower().Contains(searchText.ToLower()) || x.UserName.ToLower().Contains(searchText.ToLower()))
                    && (!associationId.HasValue || x.AssociationId == associationId.Value) && (!isActive.HasValue || x.IsActive == isActive.Value) && (!isVerified.HasValue || x.IsVerified == isVerified.Value));

                    var _users = _uow.UserRepository.Get(offset, limit, filter, sort, direction, string.Empty);

                    int totalCount = _uow.UserRepository.Count(filter);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                    return _users != null ? Ok(new
                    {
                        users = _users
                    })
                    : NotFound(new List<User>());
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
                    var user = await _userManager.SearchUserById(id);

                    return user != null ? Ok(new
                    {
                        user = user
                    })
                    : NotFound(null);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, null);
                }
            }
            return Forbid();
        }

        [Authorize]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" }))
            {
                User user = new()
                {
                    Name = model.FirstName + " " + model.LastName,
                    Email = model.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    CreatedAt = DateTime.Now,
                    UserName = model.Username,
                    NormalizedUserName = model.Username.ToUpper(),
                    IsVerified = false,
                    IsActive = false,
                    IsEmailVerified = false
                };

                ObjectResult _validate = this.ValidateUser(user);
                if (_validate.StatusCode != StatusCodes.Status200OK)
                {
                    return _validate;
                }

                var result = await _userManager.CreateUser(user, model.Password, model.UserRole);
                if (result == null || !result.Succeeded)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

                return Ok(new
                {
                    userId = user.Id
                });
            }
            return Forbid();
        }

        [Authorize]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Put([FromBody] UserModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" }))
            {
                Expression<Func<User, bool>> filter = (x => x.Id == model.UserId);

                var user = this._uow.UserRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
                if (user != null)
                {
                    if (model.IsVerifiedByAdmin.HasValue)
                    {
                        user.IsVerified = model.IsVerifiedByAdmin.Value;
                    }
                    if (model.IsActive.HasValue)
                    {
                        user.IsActive = model.IsActive.Value;
                    }

                    user.UpdatedAt = DateTime.UtcNow;
                    user.UpdatedBy = userClaims.Where(x => x.Claim == "userId").Single().Value;

                    ObjectResult _validate = this.ValidateUser(user);
                    if (_validate.StatusCode != StatusCodes.Status200OK)
                    {
                        return _validate;
                    }

                    try
                    {
                        _uow.UserRepository.Update(user);
                        _uow.Save();

                        return Ok(new
                        {
                            userId = user.Id
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
