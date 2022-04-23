using EmailService.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EmailService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailTemplatesController : ControllerBase
    {
        private readonly IEmailTemplatesRepository _emailTemplatesRepository;
        private readonly IConfiguration _configuration;

        public EmailTemplatesController(IEmailTemplatesRepository emailTemplatesRepository, IConfiguration configuration)
        {
            _emailTemplatesRepository = emailTemplatesRepository;
            _configuration = configuration;
        }
    }
}
