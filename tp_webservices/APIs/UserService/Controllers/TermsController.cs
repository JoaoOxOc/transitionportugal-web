using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Services.Database;
using UserService.Services.Email;
using UserService.Entities;
using UserService.Models;
using System.Text.Json;
using System.Linq.Expressions;
using CommonLibrary.Enums;
using CommonLibrary.Entities.ViewModel;
using Microsoft.AspNetCore.Authorization;
using CommonLibrary.Extensions;

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

        private ObjectResult ValidateTerms(TermsConditions terms)
        {
            if (terms.Version == null || terms.Version <= 0 || string.IsNullOrWhiteSpace(terms.DataBlocksJson.ToString().Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }

            Expression<Func<TermsConditions, bool>> filter = (x => x.Id != terms.Id && (x.Version == terms.Version));

            var existsTermsRecord = this._uow.TermsConditionsRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
            if (existsTermsRecord != null)
            {
                ConflictModel conflict = new ConflictModel();
                conflict.ConflictType = ConflictType.DuplicateValue;
                conflict.Entity = typeof(Scope).Name;

                if (existsTermsRecord.Version == terms.Version)
                {
                    conflict.Field = typeof(TermsConditions).GetProperty("Version").Name;
                }

                return Conflict(conflict);
            }

            return Ok(null);
        }

        private TermsModel ParseEntityToModel(TermsConditions terms, List<User> users)
        {
            TermsModel model = new TermsModel();
            model.BlocksJson = JsonSerializer.Serialize(terms.DataBlocksJson);
            model.Version = terms.Version;

            return model;
        }

        private List<TermsModel> ParseEntitiesToModel(List<TermsConditions> termsRecords)
        {
            List<TermsModel> models = new List<TermsModel>();
            foreach (var terms in termsRecords)
            {
                models.Add(ParseEntityToModel(terms, null));
            }
            return models;
        }

        private TermsConditions MapModelToEntity(TermsConditions terms, TermsModel model)
        {
            if (!string.IsNullOrEmpty(model.BlocksJson))
            {
                terms.DataBlocksJson = JsonDocument.Parse(model.BlocksJson, new JsonDocumentOptions { AllowTrailingCommas = true });
            }
            if (model.Version.HasValue)
            {
                terms.Version = model.Version.Value;
            }

            return terms;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string? searchText, bool? isActive, decimal? version, int? offset, int? limit, string sort, string sortDirection)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "terms.admin" }))
            {
                try
                {
                    offset = offset ?? 1;

                    searchText = searchText == null ? string.Empty : searchText.Trim().ToLower();
                    sort = sort ?? "Version";
                    SortDirection direction = sortDirection == "desc" ? SortDirection.Descending : SortDirection.Ascending;

                    Expression<Func<TermsConditions, bool>> filter = (x => (!version.HasValue || x.Version == version.Value) 
                    && (!isActive.HasValue || x.IsActive == isActive.Value));


                    var _terms = _uow.TermsConditionsRepository.Get(offset, limit, filter, sort, direction, string.Empty);

                    int totalCount = _uow.TermsConditionsRepository.Count(filter);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                    return _terms != null ? Ok(new
                    {
                        termsRecords = _terms
                    })
                    : NotFound(new List<TermsConditions>());
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
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "terms.admin" }))
            {
                try
                {
                    var terms = _uow.TermsConditionsRepository.GetById(id);

                    if (terms != null)
                    {
                        return Ok(new
                        {
                            termsRecord = ParseEntityToModel(terms, null)
                        });
                    }
                    else
                    {
                        return NotFound(null);
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, null);
                }
            }
            return Forbid();
        }

        [AllowAnonymous]
        [HttpGet("get/public")]
        public async Task<IActionResult> GetActivePublic()
        {
            try
            {
                Expression<Func<TermsConditions, bool>> filter = (x => x.IsActive == true);
                var terms = _uow.TermsConditionsRepository.Get(1,1, filter, "Version", SortDirection.Descending).FirstOrDefault();

                if (terms != null)
                {
                    return Ok(new
                    {
                        termsRecord = ParseEntityToModel(terms, null)
                    });
                }
                else
                {
                    return NotFound(null);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, null);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] TermsModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "terms.admin" }))
            {
                var termsLastVersion = _uow.TermsConditionsRepository.Get(1, 1, null, "Version", SortDirection.Descending).FirstOrDefault();

                TermsConditions newTerms = new TermsConditions();
                if (termsLastVersion != null)
                {
                    newTerms.Version = newTerms.Version + 1;
                }
                else
                {
                    newTerms.Version = 1;
                }
                newTerms.CreatedAt = DateTime.UtcNow;
                newTerms.CreatedBy = userClaims.Where(x => x.Claim == "userId").Single().Value;
                model.Version = null;

                newTerms = MapModelToEntity(newTerms, model);

                ObjectResult _validate = this.ValidateTerms(newTerms);
                if (_validate.StatusCode != StatusCodes.Status200OK)
                {
                    return _validate;
                }

                _uow.TermsConditionsRepository.Add(newTerms);
                _uow.Save();

                return Ok(new
                {
                    termsId = newTerms.Id,
                    termsVersion = newTerms.Version
                });
            }
            return Forbid();
        }

        [Authorize]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Put([FromBody] TermsModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "terms.admin" }))
            {
                Expression<Func<TermsConditions, bool>> filter = (x => x.Version == model.Version);

                var terms = this._uow.TermsConditionsRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
                if (terms != null)
                {
                    terms.UpdatedAt = DateTime.UtcNow;
                    terms.UpdatedBy = userClaims.Where(x => x.Claim == "userId").Single().Value;
                    model.Version = null;
                    terms = MapModelToEntity(terms, model);

                    ObjectResult _validate = this.ValidateTerms(terms);
                    if (_validate.StatusCode != StatusCodes.Status200OK)
                    {
                        return _validate;
                    }

                    try
                    {
                        _uow.TermsConditionsRepository.Update(terms);
                        _uow.Save();

                        return Ok(new
                        {
                            termsId = terms.Id,
                            termsVersion = terms.Version
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
    }
}
