using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Models;
using UserService.Services.Database;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssociationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _uow;
        public AssociationController(IUnitOfWork uow, IConfiguration configuration)
        {
            _uow = uow;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("search-association")]
        public async Task<IActionResult> SearchAssociation([FromBody] AssociationModel model)
        {
            var association = _uow.AssociationRepository.Get(null, null, (x => x.Email == model.Email || x.Vat == model.Vat), "Name").FirstOrDefault();
            if (association != null)
            {
                return Ok(new
                {
                    message = "association_exists"
                });
            }
            return NotFound();
        }

        [HttpPost]
        [Route("validate-vat")]
        public async Task<IActionResult> ValidateVat([FromBody] AssociationModel model)
        {
            var association = _uow.AssociationRepository.Get(null, null, (x => x.Vat == model.Vat), "Name").FirstOrDefault();
            if (association != null)
            {
                // TODO: remote validation of VAT number
                return Ok(new
                {
                    message = "association_exists"
                });
            }
            return NotFound();
        }
    }
}
