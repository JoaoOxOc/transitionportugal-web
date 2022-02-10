using CommonLibrary.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserService.Code;
using UserService.Entities;
using UserService.Models;
using UserService.Services;
using UserService.Services.Database;
using UserService.Services.UserManager;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly ITPUserManager _userManager;
        private readonly ITokenManager _tokenManager;
        private readonly IConfiguration _configuration;

        public AuthenticateController(ITPUserManager userManager, ITokenManager tokenManager, IConfiguration configuration)
        {
            //userManager.PasswordHasher = new CustomPasswordHasher();
            _userManager = userManager;
            _tokenManager = tokenManager;
            _configuration = configuration;
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

                var token = _tokenManager.GetToken(authClaims.Concat(userScopes).ToList());
                var refreshTokenData = _tokenManager.GenerateRefreshToken();


                user.RefreshToken = refreshTokenData.Key;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenData.Value);

                await _userManager.UpdateUser(user);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    RefreshToken = refreshTokenData.Key,
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpGet]
        [Route("profile")]
        public async Task<IActionResult> Profile()
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", "associationId" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:Secret"], claims);
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
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            User user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.Now,
                UserName = model.Username
            };
            var result = await _userManager.CreateUser(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
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
            var result = await _userManager.CreateUser(user, model.Password);
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

            #pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
            #pragma warning disable CS8602 // Dereference of a possibly null reference.
            string username = principal.Identity.Name;
            #pragma warning restore CS8602 // Dereference of a possibly null reference.
            #pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.

            var user = await _userManager.SearchUser(username);

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            var newAccessToken = _tokenManager.GetToken(principal.Claims.ToList());
            var newRefreshTokenData = _tokenManager.GenerateRefreshToken();

            user.RefreshToken = newRefreshTokenData.Key;
            await _userManager.UpdateUser(user);

            return new ObjectResult(new
            {
                accessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                refreshToken = newRefreshTokenData.Key
            });
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
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:Secret"], claims);
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
    }
}
