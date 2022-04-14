﻿using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Enums;
using CommonLibrary.Extensions;
using MicroservicesLibrary.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Text.Json;
using UserService.Entities;
using UserService.Models;
using UserService.Services.Database;
using UserService.Services.Email;
using UserService.Services.UserManager;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssociationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _uow;
        private readonly ITPUserManager _userManager;
        private readonly ITokenManager _tokenManager;
        private readonly IEmailSender _emailSender;
        public AssociationController(IUnitOfWork uow, IConfiguration configuration, ITPUserManager userManager, ITokenManager tokenManager, IEmailSender emailSender)
        {
            _uow = uow;
            _configuration = configuration;
            _userManager = userManager;
            _tokenManager = tokenManager;
            _emailSender = emailSender;
        }

        private ObjectResult ValidateAssociation(Association association)
        {
            if (association.Email == null || string.IsNullOrWhiteSpace(association.Email.Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }

            Expression<Func<Association, bool>> filter = (x => x.Id != association.Id && (x.Email.ToLower() == association.Email.ToLower() || (!string.IsNullOrEmpty(association.Vat) && x.Vat.ToLower() == association.Vat.ToLower()))
            );

            var existsAssociation = this._uow.AssociationRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
            if (existsAssociation != null)
            {
                ConflictModel conflict = new ConflictModel();
                conflict.ConflictType = ConflictType.DuplicateValue;
                conflict.Entity = typeof(Scope).Name;

                if (existsAssociation.Email.ToLower() == association.Email.ToLower())
                {
                    conflict.Field = typeof(Association).GetProperty("Email").Name;
                }

                if (existsAssociation.Vat.ToLower() == association.Vat.ToLower())
                {
                    conflict.Field = typeof(Association).GetProperty("Vat").Name;
                }

                return Conflict(conflict);
            }

            return Ok(null);
        }

        private AssociationModel ParseEntityToModel(Association association, List<User> users)
        {
            AssociationModel model = new AssociationModel();
            model.Id = association.Id;
            model.Name = association.Name;
            model.Email = association.Email;
            model.Phone = association.Phone;
            model.Address = association.Address;
            model.Town = association.Town;
            model.PostalCode = association.PostalCode;
            model.Vat = association.Vat;
            model.LogoImage = association.LogoImage;
            model.Filename = association.Filename;
            model.Description = association.Description;
            model.Website = association.Website;
            model.Latitude = association.Latitude;
            model.Longitude = association.Longitude;
            model.ContractStartDate = association.ContractStartDate;
            model.ContractEndDate = association.ContractEndDate;
            model.IsActive = association.IsActive;
            model.IsVerified = association.IsVerified;
            model.IsEmailVerified = association.IsEmailVerified;

            if (users != null)
            {
                model.AssociationUsers = new List<UserReadModel>();
                foreach (var user in users)
                {
                    model.AssociationUsers.Add(new UserReadModel
                    {
                        Id = user.Id,
                        Name = user.Name,
                        UserName = user.UserName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        CreatedAt = user.CreatedAt,
                        UpdatedAt = user.UpdatedAt,
                        IsVerified = user.IsVerified,
                        IsActive = user.IsActive,
                        AssociationName = association.Name,
                        AssociationId = association.Id
                    });
                }
            }

            return model;
        }

        private List<AssociationModel> ParseEntitiesToModel(List<Association> associations)
        {
            List<AssociationModel> models = new List<AssociationModel>();
            foreach (var association in associations)
            {
                models.Add(ParseEntityToModel(association, null));
            }
            return models;
        }

        private Association MapModelToEntity(Association association, AssociationModel model)
        {
            if (!string.IsNullOrEmpty(model.Name)) association.Name = model.Name;
            if (!string.IsNullOrEmpty(model.Email)) association.Email = model.Email;
            if (!string.IsNullOrEmpty(model.Phone)) association.Phone = model.Phone;
            if (!string.IsNullOrEmpty(model.Address)) association.Address = model.Address;
            if (!string.IsNullOrEmpty(model.Town)) association.Town = model.Town;
            if (!string.IsNullOrEmpty(model.PostalCode)) association.PostalCode = model.PostalCode;
            if (!string.IsNullOrEmpty(model.Vat)) association.Vat = model.Vat;
            if (!string.IsNullOrEmpty(model.LogoImage)) association.LogoImage = model.LogoImage;
            if (!string.IsNullOrEmpty(model.Filename)) association.Filename = model.Filename;
            if (!string.IsNullOrEmpty(model.Description)) association.Description = model.Description;
            if (!string.IsNullOrEmpty(model.Website)) association.Website = model.Website;
            if (model.Latitude.HasValue) association.Latitude = model.Latitude;
            if (model.Longitude.HasValue) association.Longitude = model.Longitude;
            if (model.ContractStartDate.HasValue) association.ContractStartDate = model.ContractStartDate;
            if (model.ContractEndDate.HasValue) association.ContractEndDate = model.ContractEndDate;
            if (model.IsActive.HasValue)
            {
                association.IsActive = model.IsActive;
            }
            else if (!association.Id.HasValue)
            {
                association.IsActive = model.IsActive;
            }
            if (model.IsVerified.HasValue)
            {
                association.IsVerified = model.IsVerified;
            }
            else if (!association.Id.HasValue)
            {
                association.IsVerified = model.IsVerified;
            }
            if (model.IsEmailVerified.HasValue)
            {
                association.IsEmailVerified = model.IsEmailVerified;
            }
            else if (!association.Id.HasValue)
            {
                association.IsEmailVerified = model.IsEmailVerified;
            }

            return association;
        }

        [HttpPost]
        [Route("search-association")]
        public async Task<IActionResult> SearchAssociation([FromBody] AssociationValidationModel model)
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
        public async Task<IActionResult> ValidateVat([FromBody] AssociationValidationModel model)
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

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string? searchText, bool? isActive, bool? isVerified, int? offset, int? limit, string sort, string sortDirection)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write", "associationusers.write" }))
            {
                try
                {
                    offset = offset ?? 1;

                    searchText = searchText == null ? string.Empty : searchText.Trim().ToLower();
                    sort = sort ?? "Name";
                    SortDirection direction = sortDirection == "desc" ? SortDirection.Descending : SortDirection.Ascending;

                    Expression<Func<Association, bool>> filter = (x => (x.Name.ToLower().Contains(searchText.ToLower()) || x.Email.ToLower().Contains(searchText.ToLower()))
                    && (!isActive.HasValue || x.IsActive == isActive.Value) && (!isVerified.HasValue || x.IsEmailVerified == isVerified.Value));


                    var _associations = _uow.AssociationRepository.Get(offset, limit, filter, sort, direction, string.Empty);

                    int totalCount = _uow.AssociationRepository.Count(filter);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                    return _associations != null ? Ok(new
                    {
                        associations = _associations
                    })
                    : NotFound(new List<Association>());
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
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write", "associationusers.write" }))
            {
                try
                {
                    var association = _uow.AssociationRepository.GetById(id);

                    if (association != null)
                    {
                        Expression<Func<User, bool>> filter = (x => x.AssociationId == association.Id);
                        var users = _uow.UserRepository.Get(null, null, filter, "Id", SortDirection.Ascending, String.Empty);

                        return Ok(new
                        {
                            associationData = ParseEntityToModel(association, users)
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

        [Authorize]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] AssociationModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" }))
            {
                Association association = MapModelToEntity(new Association(), model);

                ObjectResult _validate = this.ValidateAssociation(association);
                if (_validate.StatusCode != StatusCodes.Status200OK)
                {
                    return _validate;
                }

                _uow.AssociationRepository.Add(association);
                _uow.Save();

                return Ok(new
                {
                    associationId = association.Id
                });
            }
            return Forbid();
        }

        [Authorize]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Put([FromBody] AssociationModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" }))
            {
                Expression<Func<Association, bool>> filter = (x => x.Id == model.Id);

                var association = this._uow.AssociationRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
                if (association != null)
                {
                    association = MapModelToEntity(association, model);

                    ObjectResult _validate = this.ValidateAssociation(association);
                    if (_validate.StatusCode != StatusCodes.Status200OK)
                    {
                        return _validate;
                    }

                    try
                    {
                        _uow.AssociationRepository.Update(association);
                        _uow.Save();

                        return Ok(new
                        {
                            associationId = association.Id
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

        [Authorize]
        [HttpPost]
        [Route("resend")]
        public async Task<IActionResult> Resend([FromBody] AssociationsActionsModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" })
                && model.AssociationIds != null && model.AssociationIds.Count > 0)
            {
                Expression<Func<Association, bool>> filter = (x => model.AssociationIds.Contains(x.Id.Value) && x.IsEmailVerified == false);
                var associationsToApprove = _uow.AssociationRepository.Get(null, null, filter, "Name", SortDirection.Ascending);
                var associationsEmailError = new List<int>();
                foreach (var association in associationsToApprove)
                {
                    var associationClaims = await _userManager.GetAssociationClaimsConfirmEmail(association);

                    var associationTokenData = _tokenManager.GetToken(associationClaims, 1440, null);

                    var associationEmailLink = _configuration["ApplicationSettings:RecoverPasswordBaseUrl"] + _configuration["ApplicationSettings:ConfirmEmailUri"] + "?t=" + associationTokenData.Token;
                    bool associationEmailSuccess = await _emailSender.SendActivateAssociationEmail(association.Email, associationEmailLink);

                    if (!associationEmailSuccess)
                    {
                        associationsEmailError.Add(association.Id.Value);
                    }
                }

                return Ok(new
                {
                    associations = model.AssociationIds,
                    associationsEmailError = associationsEmailError
                });
            }
            return Forbid();
        }

        [Authorize]
        [HttpPost]
        [Route("approve")]
        public async Task<IActionResult> Approve([FromBody] AssociationsActionsModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" })
                && model.AssociationIds != null && model.AssociationIds.Count > 0)
            {
                Expression<Func<Association, bool>> filter = (x => model.AssociationIds.Contains(x.Id.Value) && (x.IsActive == false || x.IsVerified == false));
                var associationsToApprove = _uow.AssociationRepository.Get(null, null, filter, "Name", SortDirection.Ascending);
                List<string> approvedEmails = new List<string>();
                foreach (var association in associationsToApprove)
                {
                    association.IsActive = true;
                    association.IsVerified = true;
                    association.UpdatedAt = DateTime.UtcNow;
                    approvedEmails.Add(association.Email);
                }

                _uow.AssociationRepository.Update(associationsToApprove);
                _uow.Save();

                var associationEmailLink = _configuration["ApplicationSettings:RecoverPasswordBaseUrl"] + "/auth/login/cover";
                bool associationEmailSuccess = await _emailSender.SendBulkAssociationActivatedEmail(approvedEmails, associationEmailLink);

                return Ok(new
                {
                    associations = model.AssociationIds
                });
            }
            return Forbid();
        }

        [Authorize]
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete([FromBody] AssociationsActionsModel model)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role, "scope" };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            string userScopesString = userClaims.Where(x => x.Claim == "scope").Single().Value;
            List<string> scopes = !string.IsNullOrEmpty(userScopesString) ? JsonSerializer.Deserialize<List<string>>(userScopesString) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "users.write" })
                && model.AssociationIds != null && model.AssociationIds.Count > 0)
            {
                // TODO: implement delete logic for users

                return Ok(new
                {
                    associations = model.AssociationIds
                });
            }
            return Forbid();
        }
    }
}
