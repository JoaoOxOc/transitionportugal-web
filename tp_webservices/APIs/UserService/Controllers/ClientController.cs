using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Enums;
using CommonLibrary.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Net;
using UserService.Entities;
using UserService.Models;
using UserService.Services.Database;
using UserService.Services.UserManager;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ITokenManager _tokenManager;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _uow;

        public ClientController(IUnitOfWork uow, ITokenManager tokenManager, IConfiguration configuration)
        {
            _uow = uow;
            _tokenManager = tokenManager;
            _configuration = configuration;
        }

        private ObjectResult ValidateClientApp(ClientCredential clientCredential)
        {
            if (clientCredential.Name == null || string.IsNullOrWhiteSpace(clientCredential.Name.Trim()) ||
                clientCredential.ClientId == null || string.IsNullOrWhiteSpace(clientCredential.ClientId.Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }

            Expression<Func<ClientCredential, bool>> filter = (x => x.Id != clientCredential.Id && (x.ClientId.Equals(clientCredential.ClientId) || x.Name.Equals(clientCredential.Name))
            );

            var existsClientApp = this._uow.ClientCredentialRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
            if (existsClientApp != null)
            {
                ConflictModel conflict = new ConflictModel();
                conflict.ConflictType = ConflictType.DuplicateValue;
                conflict.Entity = typeof(ClientCredential).Name;

                if (existsClientApp.Name == clientCredential.Name)
                {
                    conflict.Field = typeof(ClientCredential).GetProperty("Name").Name;
                }

                if (existsClientApp.ClientId == clientCredential.ClientId)
                {
                    conflict.Field = typeof(ClientCredential).GetProperty("ClientId").Name;
                }

                return Conflict(conflict);
            }

            return Ok(null);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string searchText, int? offset, int? limit, string sort, string sortDirection)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" }))
            {
                try
                {
                    offset = offset ?? 1;

                    searchText = searchText == null ? string.Empty : searchText.Trim().ToLower();
                    sort = sort ?? "Name";
                    SortDirection direction = sortDirection == "desc" ? SortDirection.Descending : SortDirection.Ascending;

                    Expression<Func<ClientCredential, bool>> filter = (x => x.Description.ToLower().Contains(searchText) || x.Name.ToLower().Contains(searchText));

                    var _clientApps = _uow.ClientCredentialRepository.Get(offset, limit, filter, sort, direction, string.Empty);

                    int totalCount = _uow.ClientCredentialRepository.Count(filter);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                    return _clientApps != null ? Ok(_clientApps) : NotFound(new List<ClientCredential>());
                }
                catch (Exception ex)
                {
                    return StatusCode(500, null);
                }
            }
            return Forbid();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" }))
            {
                try
                {
                    var clientApp = _uow.ClientCredentialRepository.GetById(id);

                    return clientApp != null ? Ok(clientApp) : NotFound(null);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, null);
                }
            }
            return Forbid();
        }

        [Authorize]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Put([FromBody] ClientModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" }))
            {
                Expression<Func<ClientCredential, bool>> filter = (x => x.Name.ToLower().Contains(model.ClientName));

                var clientCredential = this._uow.ClientCredentialRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
                if (clientCredential != null)
                {
                    clientCredential.Description = model.ClientDescription;
                    clientCredential.Name = model.ClientName;
                    clientCredential.ClientId = model.ClientId;
                    clientCredential.UpdatedAt = DateTime.UtcNow;
                    clientCredential.UpdatedBy = userClaims.Where(x => x.Claim == "userId").Single().Value;

                    ObjectResult _validate = this.ValidateClientApp(clientCredential);
                    if (_validate.StatusCode != (int)HttpStatusCode.OK)
                    {
                        return _validate;
                    }
                    if (model.ToUpdateSecret)
                    {
                        clientCredential.ClientSecret = _tokenManager.GetClientToken().Token;
                    }

                    try
                    {
                        _uow.ClientCredentialRepository.Update(clientCredential);
                        _uow.Save();

                        return Ok(clientCredential.Name);
                    }
                    catch(Exception ex)
                    {
                        return StatusCode(500, null);
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
        [Route("register")]
        public async Task<IActionResult> RegisterClient([FromBody] ClientModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" }))
            {
                ClientCredential clientCredential = new ClientCredential();
                clientCredential.Description = model.ClientDescription;
                clientCredential.Name = model.ClientName;
                clientCredential.ClientId = model.ClientId;
                clientCredential.CreatedAt = DateTime.UtcNow;
                clientCredential.CreatedBy = userClaims.Where(x => x.Claim == "userId").Single().Value;

                ObjectResult _validate = this.ValidateClientApp(clientCredential);
                if (_validate.StatusCode != (int)HttpStatusCode.OK)
                {
                    return _validate;
                }
                if (model.ToUpdateSecret)
                {
                    clientCredential.ClientSecret = _tokenManager.GetClientToken().Token;
                }

                try
                {
                    _uow.ClientCredentialRepository.Add(clientCredential);

                    _uow.Save();

                    return Ok(new
                    {
                        clientAppId = clientCredential.Id,
                        token = clientCredential.ClientSecret
                    });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, null);
                }
            }
            return Forbid();
        }
    }
}
