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
using UserService.Services.Email;
using UserService.Services.TermsManager;
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
        private readonly IUserRoleManager _userRoleManager;
        private readonly ITokenManager _tokenManager;
        private readonly IEmailSender _emailSender;
        private readonly ITermsManager _termsManager;

        public UserController(IUnitOfWork uow, IConfiguration configuration, ITPUserManager userManager, IUserRoleManager userRoleManager, ITokenManager tokenManager, IEmailSender emailSender, ITermsManager termsManager)
        {
            _uow = uow;
            _configuration = configuration;
            _userManager = userManager;
            _userRoleManager = userRoleManager;
            _tokenManager = tokenManager;
            _emailSender = emailSender;
            _termsManager = termsManager;
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

        private UserReadModel ParseEntityToModel(User user)
        {
            UserReadModel model = new UserReadModel();

            var userRole = _userRoleManager.GetUserRoleByUserId(user.Id);

            if (user != null)
            {

                model.Id = user.Id;
                model.Name = user.Name;
                model.UserName = user.UserName;
                model.Email = user.Email;
                model.PhoneNumber = user.PhoneNumber;
                model.CreatedAt = user.CreatedAt;
                model.UpdatedAt = user.UpdatedAt;
                model.IsVerified = user.IsVerified;
                model.IsActive = user.IsActive;
                model.IsEmailVerified = user.IsEmailVerified;
                model.AssociationName = user.Association?.Name;
                model.AssociationId = user.Association?.Id;
                model.UserRole = userRole?.Name;
            }

            return model;
        }

        private List<UserReadModel> ParseEntitiesToModel(List<User> users)
        {
            List<UserReadModel> models = new List<UserReadModel>();
            foreach (var user in users)
            {
                models.Add(ParseEntityToModel(user));
            }
            return models;
        }

        private User MapModelToEntity(User user, UserReadModel model)
        {
            user.Name = model.Name;
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            user.UserName = model.UserName;
            if (model.IsActive.HasValue)
            {
                user.IsActive = model.IsActive.Value;
            }
            else if (!string.IsNullOrEmpty(user.Id))
            {
                user.IsActive = model.IsActive.HasValue ? model.IsActive.Value : false;
            }
            if (model.IsVerified.HasValue)
            {
                user.IsVerified = model.IsVerified.Value;
            }
            else if (!string.IsNullOrEmpty(user.Id))
            {
                user.IsVerified = model.IsVerified.HasValue ? model.IsVerified.Value : false;
            }
            if (model.IsEmailVerified.HasValue)
            {
                user.IsEmailVerified = model.IsEmailVerified;
            }
            else if (!string.IsNullOrEmpty(user.Id))
            {
                user.IsEmailVerified = model.IsEmailVerified;
            }

            return user;
        }

        

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string? searchText, int? associationId, string? userRole, bool? isActive, bool? isVerified, int? offset, int? limit, string sort, string sortDirection)
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

                    var filterbyUserIds = _userRoleManager.GetUserIdsByRole(userRole);

                    Expression<Func<User, bool>> filter = (x => (filterbyUserIds.Count == 0 || filterbyUserIds.Contains(x.Id))
                    && (x.Name.ToLower().Contains(searchText.ToLower()) || x.UserName.ToLower().Contains(searchText.ToLower()))
                    && (!associationId.HasValue || x.AssociationId == associationId.Value)
                    && (!isActive.HasValue || x.IsActive == isActive.Value)
                    && (!isVerified.HasValue || x.IsVerified == isVerified.Value));

                    var _users = _uow.UserRepository.Get(offset, limit, filter, sort, direction, "Association");

                    int totalCount = _uow.UserRepository.Count(filter);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                    return _users != null ? Ok(new
                    {
                        users = ParseEntitiesToModel(_users)
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

                    if (user != null && user.AssociationId.HasValue)
                    {
                        user.Association = _uow.AssociationRepository.GetById(user.AssociationId.Value);
                    }

                    return user != null ? Ok(new
                    {
                        user = ParseEntityToModel(user)
                    })
                    : NotFound(null);
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
                    IsEmailVerified = false,
                    TermsConsent = model.TermsConfirmed.HasValue ? model.TermsConfirmed.Value : true,
                    TermsConsentVersion = _termsManager.GetActiveTermsConditionsVersion()
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

        [Authorize]
        [HttpPost]
        [Route("resend")]
        public async Task<IActionResult> Resend([FromBody] UsersActionsModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" })
                && model.UserIds != null && model.UserIds.Count > 0)
            {
                Expression<Func<User, bool>> filter = (x => model.UserIds.Contains(x.Id) && x.IsEmailVerified == false);
                var usersToApprove = _uow.UserRepository.Get(null, null, filter, "UserName", SortDirection.Ascending);
                var usersEmailError = new List<string>();
                foreach (var user in usersToApprove)
                {
                    var userToApproveClaims = await _userManager.GetUserClaimsPasswordRecovery(user);

                    var userTokenData = _tokenManager.GetToken(userToApproveClaims, 1440, null);

                    var userEmailLink = _configuration["ApplicationSettings:RecoverPasswordBaseUrl"] + _configuration["ApplicationSettings:ConfirmEmailUri"] + "?t=" + userTokenData.Token;
                    bool userEmailSuccess = await _emailSender.SendActivateUserEmail(user.Email, "pt-PT", userEmailLink);

                    if (!userEmailSuccess)
                    {
                        usersEmailError.Add(user.Id);
                    }
                }

                return Ok(new
                {
                    users = model.UserIds,
                    usersEmailError = usersEmailError
                });
            }
            return Forbid();
        }

        [Authorize]
        [HttpPost]
        [Route("approve")]
        public async Task<IActionResult> Approve([FromBody] UsersActionsModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" })
                && model.UserIds != null && model.UserIds.Count > 0)
            {
                Expression<Func<User, bool>> filter = (x => model.UserIds.Contains(x.Id) && (x.IsActive == false || x.IsVerified == false));
                var usersToApprove = _uow.UserRepository.Get(null, null, filter, "UserName", SortDirection.Ascending);
                List<string> approvedEmails = new List<string>();
                foreach (var user in usersToApprove)
                {
                    user.IsActive = true;
                    user.IsVerified = true;
                    user.UpdatedAt = DateTime.UtcNow;
                    user.UpdatedBy = userClaims.Where(x => x.Claim == "userId").Single().Value;
                    approvedEmails.Add(user.Email);
                }

                _uow.UserRepository.Update(usersToApprove);
                _uow.Save();

                var userEmailLink = _configuration["ApplicationSettings:RecoverPasswordBaseUrl"] + "/auth/login/cover";
                bool userEmailSuccess = await _emailSender.SendBulkUserActivatedEmail(approvedEmails, "pt-PT", userEmailLink);

                return Ok(new
                {
                    users = model.UserIds
                });
            }
            return Forbid();
        }

        [Authorize]
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete([FromBody] UsersActionsModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" })
                && model.UserIds != null && model.UserIds.Count > 0)
            {
                // TODO: implement delete logic for users

                return Ok(new
                {
                    users = model.UserIds
                });
            }
            return Forbid();
        }
    }
}
