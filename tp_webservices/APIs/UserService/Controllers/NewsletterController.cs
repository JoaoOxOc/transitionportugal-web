using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Enums;
using CommonLibrary.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
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
    public class NewsletterController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _configuration;
        private readonly ITPUserManager _userManager;
        private readonly ITokenManager _tokenManager;

        public NewsletterController(IUnitOfWork uow, IConfiguration configuration, ITPUserManager userManager, ITokenManager tokenManager)
        {
            _uow = uow;
            _configuration = configuration;
            _userManager = userManager;
            _tokenManager = tokenManager;
        }

        private ObjectResult ValidateNewsletter(NewsletterSubscription newsletter)
        {
            if (newsletter.Email == null || string.IsNullOrWhiteSpace(newsletter.Email.Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }

            Expression<Func<NewsletterSubscription, bool>> filter = (x => x.Id != newsletter.Id && (x.Email.ToLower().Equals(newsletter.Email.ToLower()))
            );

            var existsNewsletter = this._uow.NewsletterSubscriptionRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
            if (existsNewsletter != null)
            {
                ConflictModel conflict = new ConflictModel();
                conflict.ConflictType = ConflictType.DuplicateValue;
                conflict.Entity = typeof(NewsletterSubscription).Name;

                if (existsNewsletter.Email.ToLower() == newsletter.Email.ToLower())
                {
                    conflict.Field = typeof(NewsletterSubscription).GetProperty("Email").Name;
                }

                return Conflict(conflict);
            }

            return Ok(null);
        }

        private NewsletterSubscriptionModel ParseEntityToModel(NewsletterSubscription subscription)
        {
            NewsletterSubscriptionModel model = new NewsletterSubscriptionModel();
            model.Email = subscription.Email;

            if (subscription.User != null)
            {
                model.UserId = subscription.UserId;
                model.UserFullName = subscription.User.Name;
            }

            return model;
        }

        private List<NewsletterSubscriptionModel> ParseEntitiesToModel(List<NewsletterSubscription> subscriptions)
        {
            List<NewsletterSubscriptionModel> models = new List<NewsletterSubscriptionModel>();
            foreach (var subs in subscriptions)
            {
                models.Add(ParseEntityToModel(subs));
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
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "newsletter.admin" }))
            {
                try
                {
                    offset = offset ?? 1;

                    searchText = searchText == null ? string.Empty : searchText.Trim().ToLower();
                    sort = sort ?? "ScopeName";
                    SortDirection direction = sortDirection == "desc" ? SortDirection.Descending : SortDirection.Ascending;

                    Expression<Func<NewsletterSubscription, bool>> filter = (x => x.Email.ToLower().Contains(searchText.ToLower()));

                    var _subscriptions = _uow.NewsletterSubscriptionRepository.Get(offset, limit, filter, sort, direction, string.Empty);

                    int totalCount = _uow.NewsletterSubscriptionRepository.Count(filter);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                    return _subscriptions != null ? Ok(new
                    {
                        subscriptions = ParseEntitiesToModel(_subscriptions)
                    })
                    : NotFound(new List<NewsletterSubscription>());
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
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "newsletter.admin" }))
            {
                try
                {
                    Expression<Func<NewsletterSubscription, bool>> filter = (x => x.Id == id);
                    var _subscription = _uow.NewsletterSubscriptionRepository.Get(1, 1, filter, "Id", SortDirection.Ascending, "User").FirstOrDefault();

                    if (_subscription != null)
                    {
                        return Ok(new
                        {
                            subscription = ParseEntityToModel(_subscription)
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

        private async Task<IActionResult> registNewsletter(string email, string userId)
        {
            NewsletterSubscription subscription = new()
            {
                Email = email
            };

            subscription.SubscriptionToken = _tokenManager.GetClientToken(await _userManager.GetNewsletterSubscriptionClaims()).Token;

            if (!string.IsNullOrEmpty(userId))
            {
                var user = await _userManager.SearchUserById(userId);
                if (user != null)
                {
                    subscription.UserId = user.Id;
                }
            }

            ObjectResult _validate = this.ValidateNewsletter(subscription);
            if (_validate.StatusCode != StatusCodes.Status200OK)
            {
                return _validate;
            }

            _uow.NewsletterSubscriptionRepository.Add(subscription);
            _uow.Save();

            return Ok(new
            {
                subscriptionId = subscription.Id
            });
        }

        [Authorize]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]NewsletterSubscriptionModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "newsletter.admin" }))
            {
                return await registNewsletter(model.Email, model.UserId);
            }
            return Forbid();
        }

        [HttpPost]
        [Route("public/register")]
        public async Task<IActionResult> PublicRegister([FromBody] NewsletterSubscriptionModel model)
        {
            return await registNewsletter(model.Email, null);
        }

        [Authorize]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Put([FromBody] NewsletterSubscriptionModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "newsletter.admin" }))
            {
                Expression<Func<NewsletterSubscription, bool>> filter = (x => x.Email == model.Email);

                var _subscription = this._uow.NewsletterSubscriptionRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
                if (_subscription != null)
                {
                    if (!string.IsNullOrEmpty(model.UserId))
                    {
                        var user = await _userManager.SearchUserById(model.UserId);
                        if (user != null)
                        {
                            _subscription.UserId = user.Id;
                        }
                    }

                    ObjectResult _validate = this.ValidateNewsletter(_subscription);
                    if (_validate.StatusCode != StatusCodes.Status200OK)
                    {
                        return _validate;
                    }

                    try
                    {
                        _uow.NewsletterSubscriptionRepository.Update(_subscription);
                        _uow.Save();

                        return Ok(new
                        {
                            subscriptionId = _subscription.Id
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

        private async Task<IActionResult> removeSubscription(string email, bool isAdmin, string validationToken)
        {
            Expression<Func<NewsletterSubscription, bool>> filter = (x => (isAdmin && x.Email == email) || (!string.IsNullOrEmpty(validationToken) && x.SubscriptionToken == validationToken && x.Email == email));

            var _subscription = this._uow.NewsletterSubscriptionRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
            if (_subscription != null)
            {
                this._uow.NewsletterSubscriptionRepository.Delete(_subscription);

                return Ok(new
                {
                    subscriptionEmailRemoved = email
                });
            }
            else
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete([FromBody] NewsletterSubscriptionModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "newsletter.admin" }))
            {
                return await removeSubscription(model.Email, true, model.ValidationToken);
            }
            return Forbid();
        }

        [HttpDelete]
        [Route("public/delete")]
        public async Task<IActionResult> PublicDelete([FromBody] NewsletterSubscriptionModel model)
        {
            if (!string.IsNullOrEmpty(model.ValidationToken))
            {
                List<JwtClaim> validateClaims = JwtHelper.ValidateToken(model.ValidationToken, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], new string[1] { JwtRegisteredClaimNames.Jti });
                if (validateClaims != null && validateClaims.Count > 0)
                {
                    return await removeSubscription(model.Email, false, model.ValidationToken);
                }
                else
                {
                    return Unauthorized();
                }
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
