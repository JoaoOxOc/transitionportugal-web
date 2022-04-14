using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Services.Database;
using UserService.Services.Email;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TermsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _uow;
        private readonly IEmailSender _emailSender;

        public TermsController(IUnitOfWork uow, IConfiguration configuration, IEmailSender emailSender)
        {
            _uow = uow;
            _configuration = configuration;
            _emailSender = emailSender;
        }
    }
}
