using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using UserService.Entities;
using UserService.Helpers;
using UserService.Models;
using UserService.Services.RabbitMQ;
using UserService.Services.UserManager;
using MicroservicesLibrary.Exceptions;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly ITPUserManager _userManager;
        private readonly ITokenManager _tokenManager;
        private readonly IConfiguration _configuration;
        private readonly IRabbitMQSender _rabbitMqSender;

        public AuthenticateController(ITPUserManager userManager, ITokenManager tokenManager, IConfiguration configuration, IRabbitMQSender rabbitMqSender)
        {
            //userManager.PasswordHasher = new CustomPasswordHasher();
            _userManager = userManager;
            _tokenManager = tokenManager;
            _configuration = configuration;
            _rabbitMqSender = rabbitMqSender;
        }

        [HttpGet]
        [Route("fingerprint")]
        public async Task<IActionResult> Fingerprint()
        {
            var fingerprintData = _tokenManager.GenerateAuthFingerprint("_TPSSID");

            Response.Cookies.Append(fingerprintData.CookieName, fingerprintData.CookieValue, fingerprintData.CookieProperties);

            return Ok(new
            {
                message = "Server fingerprint generated"
            });
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.ValidateLoginUser(model.Username, model.Password);
            if (user != null)
            {
                var authClaims = await _userManager.GetUserClaims(user);

                var userScopes = await _userManager.GetUserScopes(user);

                var fingerprintData = _tokenManager.GenerateAuthFingerprint("_TPSSID");

                //Response.Cookies.Append(fingerprintData.CookieName, fingerprintData.CookieValue, fingerprintData.CookieProperties);
                try
                {
                    var tokenData = _tokenManager.GetToken(authClaims.Concat(userScopes).ToList(), null, fingerprintData.CookieValue);
                    var refreshTokenData = _tokenManager.GenerateRefreshToken(user.Id, fingerprintData.CookieValue);


                    user.RefreshToken = refreshTokenData.Key;
                    user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenData.Value);

                    await _userManager.UpdateUser(user);

                    return Ok(new
                    {
                        token = tokenData.Token,
                        RefreshToken = refreshTokenData.Key,
                        expiration = tokenData.ExpiresAt
                    });
                }
                catch(Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, null);
                }
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("search-user")]
        public async Task<IActionResult> SearchUser([FromBody] LoginModel model)
        {
            var user = await _userManager.SearchUser(model.Username);
            if (user != null)
            {
                return Ok(new
                {
                    message = "user_exists"
                });
            }
            return NotFound();
        }

        [Authorize]
        [HttpGet]
        [Route("profile")]
        public async Task<IActionResult> Profile()
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", "associationId" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (userClaims != null && userClaims.Count > 0)
            {
                //int requesterId = Convert.ToInt32(jwtClaims.Where(x => x.Claim == "userId").Single().Value);
                string userId = userClaims.Where(x => x.Claim == "userId").Single().Value;
                var user = _userManager.GetUserProfileById(userId);
                
                return Ok(user);
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.SearchUser(model.Username);
            var userEmailExists = await _userManager.SearchUser(model.Email);
            if (userExists != null || userEmailExists != null)
                return StatusCode(StatusCodes.Status409Conflict, new Response { Status = "Error", Message = "user_exists" });

            var associationEmailExists = await _userManager.SearchAssociationByEmail(model.AssociationEmail);
            var associationVatExists = await _userManager.SearchAssociationByVat(model.AssociationVat);
            if (associationEmailExists != null || associationVatExists != null)
                return StatusCode(StatusCodes.Status409Conflict, new Response { Status = "Error", Message = "association_exists" });

            Association association = new()
            {
                Name = model.AssociationName,
                Address = model.AssociationAddress,
                Town = model.AssociationTown,
                PostalCode = "",
                Email = model.AssociationEmail,
                Vat = model.AssociationVat,
                Phone = "",
                LogoImage = "",
                Filename = "",
                Description = "",
                Website = "",
                Tags = "",
                CreatedAt = DateTime.Now,
                IsActive = false,
                IsVerified = false,
                IsEmailVerified = false
            };

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
            var result = await _userManager.CreateUserWithAssociation(user, association, model.Password);
            if (result.Key == null || string.IsNullOrEmpty(result.Key.Id))
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            var userClaims = await _userManager.GetUserClaimsPasswordRecovery(result.Key);
            var associationClaims = await _userManager.GetAssociationClaimsConfirmEmail(result.Value);

            var userTokenData = _tokenManager.GetToken(userClaims, 1440, null);

            var associationTokenData = _tokenManager.GetToken(associationClaims, 1440, null);

            //TODO: send email through the helper class with template
            EmailVM userEmailData = new EmailVM();
            userEmailData.To = new List<string> { "jp_69_7@hotmail.com" };//TODO: replace with user.Email, only use the current line for testing
            var userEmailLink = _configuration["ApplicationSettings:RecoverPasswordBaseUrl"] + _configuration["ApplicationSettings:ConfirmEmailUri"] + "?t=" + userTokenData.Token;
            userEmailData.Body = "Please access the following url to confirm your email, you only have 24 hours to do so:<br/><a target='_blank' rel='noopener noreferrer' href='" + userEmailLink + "'>" + userEmailLink + "</a>";
            userEmailData.Subject = "Confirm your email";
            userEmailData.EmailTemplateKey = "";

            bool userEmailSuccess = await _rabbitMqSender.PublishEmailMessage(userEmailData);

            EmailVM associationEmailData = new EmailVM();
            associationEmailData.To = new List<string> { "jp_69_7@hotmail.com" };//TODO: replace with user.Email, only use the current line for testing
            var associationEmailLink = _configuration["ApplicationSettings:RecoverPasswordBaseUrl"] + _configuration["ApplicationSettings:ConfirmEmailUri"] + "?t=" + associationTokenData.Token;
            associationEmailData.Body = "Please access the following url to confirm your email, you only have 24 hours to do so:<br/><a target='_blank' rel='noopener noreferrer' href='" + associationEmailLink + "'>" + associationEmailLink + "</a>";
            associationEmailData.Subject = "Confirm your email";
            associationEmailData.EmailTemplateKey = "";

            bool associationEmailSuccess = await _rabbitMqSender.PublishEmailMessage(associationEmailData);

            if (!userEmailSuccess)
            {
                throw new AppException("User Email send error");
            }
            if (!associationEmailSuccess)
            {
                throw new AppException("Association Email send error");
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpGet]
        [Route("confirm-email")]
        public async Task<IActionResult> ConfirmEmail()
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "associationId" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (userClaims != null && userClaims.Count > 0)
            {
                var user = await _userManager.SearchUserById(userClaims.Where(x => x.Claim == "userId").Single().Value);
                if (user != null)
                {
                    user.IsEmailVerified = true;
                    var result = await _userManager.UpdateUser(user);
                    if (result != null && result.Succeeded)
                    {
                        return Ok(new Response { Status = "Success", Message = "email_verified" });
                    }
                    else
                    {
                        throw new AuthException("Error verifying email. Please try again");
                    }
                }
                else
                {
                    int associationId = -1;
                    int.TryParse(userClaims.Where(x => x.Claim == "associationId").Single().Value, out associationId);
                    var association = await _userManager.SearchAssociationById(associationId);
                    if (association != null)
                    {
                        association.IsEmailVerified = true;
                        var result = await _userManager.UpdateAssociation(association);
                        if (result != null)
                        {
                            return Ok(new Response { Status = "Success", Message = "email_verified" });
                        }
                        else
                        {
                            throw new AuthException("Error verifying email. Please try again");
                        }
                    }
                }
                return NotFound();
            }
            else
            {
                return Unauthorized("token_expired");
            }
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.SearchUser(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            User user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateUser(user, model.Password, "Admin");
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            await _userManager.CreateRole(user, "Admin");

            await _userManager.CreateRole(user, "User");

            await _userManager.AddUserToRole(user, "Admin");

            await _userManager.AddUserToRole(user, "User");

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            if (tokenModel is null)
            {
                return BadRequest("Invalid client request");
            }

            string? accessToken = tokenModel.AccessToken;
            string? refreshToken = tokenModel.RefreshToken;

            var principal = _tokenManager.GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            try
            {

                string cookieValueFromContext = HttpContext.Request.Cookies["_TPSSID"];

                var refreshPrincipals = _tokenManager.GetPrincipalFromRefreshToken(refreshToken);

                var fingerprintValid = _tokenManager.ValidateAuthFingerprint(cookieValueFromContext, refreshPrincipals.Claims.Where(x => x.Type == "userContext").FirstOrDefault()?.Value);

                #pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                #pragma warning disable CS8602 // Dereference of a possibly null reference.
                string username = principal.Identity.Name;
                #pragma warning restore CS8602 // Dereference of a possibly null reference.
                #pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.

                var user = await _userManager.SearchUser(username);

                if (!fingerprintValid || user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                {
                    return BadRequest("Invalid access token or refresh token");
                }

                var newAccessTokenData = _tokenManager.GetToken(principal.Claims.ToList(), null, cookieValueFromContext);
                var newRefreshTokenData = _tokenManager.GenerateRefreshToken(user.Id, cookieValueFromContext);

                user.RefreshToken = newRefreshTokenData.Key;
                await _userManager.UpdateUser(user);

                return new ObjectResult(new
                {
                    accessToken = newAccessTokenData.Token,
                    refreshToken = newRefreshTokenData.Key,
                    cookieValueFromContext = cookieValueFromContext,
                    fingerprintValid = fingerprintValid
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, null);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("revoke/{username}")]
        public async Task<IActionResult> Revoke(string username)
        {
            var user = await _userManager.SearchUser(username);
            if (user == null) return BadRequest("Invalid user name");

            user.RefreshToken = null;
            await _userManager.UpdateUser(user);

            return NoContent();
        }

        [Authorize]
        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", "associationId" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (userClaims != null && userClaims.Count > 0)
            {
                var user = await _userManager.SearchUserById(userClaims.Where(x => x.Claim == "userId").Single().Value);
                if (user == null) return BadRequest("Invalid user");

                user.RefreshToken = null;
                await _userManager.UpdateUser(user);

                return NoContent();
            }
            else
            {
                return Unauthorized();
            }
        }

        [Authorize]
        [HttpPost]
        [Route("revoke-all")]
        public async Task<IActionResult> RevokeAll()
        {
            var users = await _userManager.GetUsers();
            foreach (var user in users)
            {
                user.RefreshToken = null;
                await _userManager.UpdateUser(user);
            }

            return NoContent();
        }

        [HttpPost]
        [Route("recover-password-request")]
        public async Task<IActionResult> RecoverPasswordRequest([FromBody] RecoverModel model)
        {
            var user = await _userManager.SearchUser(model.Username);
            if (user != null)
            {
                EmailVM emailData = new EmailVM();
                emailData.To = new List<string> { "jp_69_7@hotmail.com" };//TODO: replace with user.Email, only use the current line for testing
                var authClaims = await _userManager.GetUserClaimsPasswordRecovery(user);

                var tokenData = _tokenManager.GetToken(authClaims, null, null);
                var emailLink = _configuration["ApplicationSettings:RecoverPasswordBaseUrl"] + _configuration["ApplicationSettings:RecoverPasswordUri"] + "?t=" + tokenData.Token;
                emailData.Body = "Please access the following url to reset your password, you only have 15 minutes to reset your password:<br/><a target='_blank' rel='noopener noreferrer' href='" + emailLink + "'>" + emailLink + "</a>";
                emailData.Subject = "Reset your password";
                emailData.EmailTemplateKey = "";

                bool success = await _rabbitMqSender.PublishEmailMessage(emailData);
                if (!success)
                {
                    throw new AppException("Email send error");
                }
                return Ok(new Response { Status = "Success", Message = "recover_requested" });
            }
            return NotFound();
        }

        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] RecoverModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (userClaims != null && userClaims.Count > 0)
            {
                var user = await _userManager.SearchUserById(userClaims.Where(x => x.Claim == "userId").Single().Value);
                if (user != null)
                {
                    bool updated = await _userManager.UpdateUserPassword(userClaims.Where(x => x.Claim == "userId").Single().Value, model.ConfirmPassword);
                    if (updated)
                    {
                        return Ok(new Response { Status = "Success", Message = "password_reset" });
                    }
                    else
                    {
                        throw new AuthException("Error updating password. Please try again");
                    }
                }
                return NotFound();
            }
            else
            {
                return Unauthorized("token_expired");
            }
        }
    }
}
