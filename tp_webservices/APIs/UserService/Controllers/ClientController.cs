using CommonLibrary.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Models;
using UserService.Services.UserManager;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ITokenManager _tokenManager;
        private readonly IConfiguration _configuration;
        public ClientController(ITokenManager tokenManager, IConfiguration configuration)
        {
            _tokenManager = tokenManager;
            _configuration = configuration;
        }

        [Authorize]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterClient([FromBody] ClientModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" }))
            {
                var clientToken = _tokenManager.GetClientToken();

                return Ok(new
                {
                    token = clientToken
                });
            }
            return Unauthorized();
        }
    }
}
