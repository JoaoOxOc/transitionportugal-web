using CommonLibrary.Entities;
using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Enums;
using CommonLibrary.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Net;
using UserService.Enum;
using UserService.Services.Database;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        protected IUnitOfWork uow { get; set; }
        protected IConfiguration _configuration;


        public SettingsController(IUnitOfWork uow, IConfiguration Configuration)
        {
            this.uow = uow;
            _configuration = Configuration;
        }

        private ObjectResult ValidateSetting(Setting setting)
        {
            if (setting.Key == null || string.IsNullOrWhiteSpace(setting.Key.Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }

            Expression<Func<Setting, bool>> filter = (x => x.Id != setting.Id && (x.Key.Equals(setting.Key))
            );

            var existsSetting = uow.SettingRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending, string.Empty, true).FirstOrDefault();
            if (existsSetting != null)
            {
                ConflictModel conflict = new ConflictModel();
                conflict.ConflictType = ConflictType.DuplicateValue;
                conflict.Entity = typeof(Setting).Name;

                if (existsSetting.Key == setting.Key)
                {
                    conflict.Field = typeof(Setting).GetProperty("Key").Name;
                }

                return Conflict(conflict);
            }

            return Ok(null);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string? searchText, int? settingType, int? offset, int? limit, string sort, string sortDirection)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" }))
            {
                try
                {
                    offset = offset ?? 1;
                    //limit = limit ?? GlobalVars.PAGE_SIZE;

                    searchText = searchText == null ? string.Empty : searchText.Trim().ToLower();
                    sort = sort ?? "Id";
                    SortDirection direction = sortDirection == "desc" ? SortDirection.Descending : SortDirection.Ascending;

                    Expression<Func<Setting, bool>> filter = (x => x.Description.ToLower().Contains(searchText) || x.Key.ToLower().Contains(searchText));

                    var _settings = uow.SettingRepository.Get(offset, limit, filter, sort, direction, string.Empty);

                    int totalCount = uow.SettingRepository.Count(filter);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                    return _settings != null ? Ok(new
                    {
                        settings = _settings
                    })
                    : NotFound(null);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, null);
                }
            }

            return Forbid();
        }

        [HttpGet]
        [Route("userPublicSettings")]
        public async Task<IActionResult> GetPublicSettings(string? searchText, int? offset, int? limit, string sort, string sortDirection)
        {
            try
            {
                offset = offset ?? 1;
                //limit = limit ?? GlobalVars.PAGE_SIZE;

                searchText = searchText == null ? string.Empty : searchText.Trim().ToLower();
                sort = sort ?? "Id";
                SortDirection direction = sortDirection == "desc" ? SortDirection.Descending : SortDirection.Ascending;

                Expression<Func<Setting, bool>> filter = (x => (x.Description.ToLower().Contains(searchText) || x.Key.ToLower().Contains(searchText))
                && (x.Key == SettingCode.CaptchaSiteKey.ToString() || x.Key == SettingCode.CaptchaSecretKey.ToString()));

                var _settings = uow.SettingRepository.Get(offset, limit, filter, sort, direction, string.Empty);

                int totalCount = uow.SettingRepository.Count(filter);

                Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                return _settings != null ? Ok(_settings) : NotFound(null);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
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
                    var _setting = uow.SettingRepository.GetById(id);

                    return _setting != null ? Ok(_setting) : NotFound(null);
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
        [Route("edit")]
        public async Task<IActionResult> Put([FromBody] Setting editedSetting)
        {
            string header = HttpContext.Request.Headers["Authorization"];
            string[] claims = new string[] { "userId", "sub", System.Security.Claims.ClaimTypes.Role };
            List<JwtClaim> userClaims = JwtHelper.ValidateToken(header, _configuration["JWT:ValidAudience"], _configuration["JWT:ValidIssuer"], _configuration["JWT:SecretPublicKey"], claims);
            if (PermissionsHelper.ValidateRoleClaimPermission(userClaims, new List<string> { "Admin" }))
            {
                try
                {
                    var _setting = uow.SettingRepository.Get(null, null, (x => x.Id == editedSetting.Id), string.Empty, SortDirection.Ascending, string.Empty, true).FirstOrDefault();
                    if (_setting != null)
                    {
                        _setting.Description = editedSetting.Description;
                        _setting.DefaultValue = editedSetting.DefaultValue;
                        _setting.Value = editedSetting.Value;
                        _setting.UpdatedAt = DateTime.UtcNow;
                        _setting.UpdatedBy = userClaims.Where(x => x.Claim == "userId").Single().Value;

                        ObjectResult _validate = this.ValidateSetting(_setting);
                        if (_validate.StatusCode != (int)HttpStatusCode.OK)
                        {
                            return _validate;
                        }

                        uow.SettingRepository.Update(_setting);
                        uow.Save();

                        return Ok(_setting);
                    }
                    else
                    {
                        return NotFound(null);
                    }
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
