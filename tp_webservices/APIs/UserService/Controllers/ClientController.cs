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
        public ClientController(ITokenManager tokenManager)
        {
            _tokenManager = tokenManager;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterClient([FromBody] ClientModel model)
        {
            var clientToken = _tokenManager.GetClientToken();

            return Ok(new
            {
                token = clientToken
            });
        }
    }
}
