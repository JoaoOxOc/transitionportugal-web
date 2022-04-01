using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContentManageService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannerController : ControllerBase
    {
        public BannerController()
        {
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            string userId = HttpContext.Request.Headers["UserId"];
            string userRole = HttpContext.Request.Headers["UserRole"];
            string userClaims = HttpContext.Request.Headers["UserClaims"];

            return Ok(new {userId = userId , userRole = userRole, userClaims = userClaims });
        }
    }
}
