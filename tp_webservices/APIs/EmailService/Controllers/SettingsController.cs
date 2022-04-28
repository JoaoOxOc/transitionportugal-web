﻿using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Enums;
using CommonLibrary.Extensions;
using EmailService.Model;
using EmailService.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Net;
using System.Text.Json;

namespace EmailService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsRepository _settingsRepository;
        private readonly IConfiguration _configuration;

        public SettingsController(ISettingsRepository settingsRepository, IConfiguration configuration)
        {
            _settingsRepository = settingsRepository;
            _configuration = configuration;
        }

        private ObjectResult ValidateSetting(Setting setting)
        {
            if (setting.Key == null || string.IsNullOrWhiteSpace(setting.Key.Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }


            Expression<Func<Setting, bool>> filter = (x => x.Id != setting.Id && (x.Key.Equals(setting.Key))
            );

            var existsSetting = this._settingsRepository.GetFiltered(setting.Key, null, null, string.Empty, string.Empty, setting.Id).FirstOrDefault();
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

        [HttpGet]
        public async Task<IActionResult> Get(string? searchText, int? offset, int? limit, string sort, string sortDirection)
        {
            try
            {
                List<string> scopes = !string.IsNullOrEmpty(HttpContext.Request.Headers["UserClaims"]) ? JsonSerializer.Deserialize<List<string>>(HttpContext.Request.Headers["UserClaims"]) : null;
                if (PermissionsHelper.ValidateRoleClaimPermission(HttpContext.Request.Headers["UserRole"], new List<string> { "Admin" })
                    && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "settings.admin" }))
                {
                    searchText = string.IsNullOrEmpty(searchText) ? string.Empty : searchText;

                    List<Setting> result = this._settingsRepository.GetFiltered(searchText, offset, limit, sort, sortDirection).ToList();

                    var totalElements = this._settingsRepository.Count(searchText, 1, null, sort);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalElements.ToString());

                    if (result.Count() > 0)
                    {
                        return Ok(new
                        {
                            settings = result
                        });
                    }
                    else
                    {
                        return NotFound(new List<Setting>());
                    }
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.Forbidden, null);
                }

            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, null);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                List<string> scopes = !string.IsNullOrEmpty(HttpContext.Request.Headers["UserClaims"]) ? JsonSerializer.Deserialize<List<string>>(HttpContext.Request.Headers["UserClaims"]) : null;
                if (PermissionsHelper.ValidateRoleClaimPermission(HttpContext.Request.Headers["UserRole"], new List<string> { "Admin" })
                    && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "settings.admin" }))
                {
                    var _setting = await this._settingsRepository.GetById(id);

                    ObjectResult response = _setting != null ? StatusCode((int)HttpStatusCode.OK, _setting) : StatusCode((int)HttpStatusCode.NotFound, null);
                    return response;
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.Forbidden, null);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, null);
            }
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> EditSetting([FromBody] SettingModel model)
        {
            List<string> scopes = !string.IsNullOrEmpty(HttpContext.Request.Headers["UserClaims"]) ? JsonSerializer.Deserialize<List<string>>(HttpContext.Request.Headers["UserClaims"]) : null;
            if (PermissionsHelper.ValidateRoleClaimPermission(HttpContext.Request.Headers["UserRole"], new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "settings.admin" }))
            {
                var _setting = this._settingsRepository.GetFiltered(model.Key, null, null, string.Empty, string.Empty).FirstOrDefault();
                if (_setting != null)
                {
                    if(!string.IsNullOrEmpty(model.Description))
                        _setting.Description = model.Description;

                    if (!string.IsNullOrEmpty(model.DefaultValue))
                        _setting.DefaultValue = model.DefaultValue;

                    if (!string.IsNullOrEmpty(model.Value))
                        _setting.Value = model.Value;

                    _setting.UpdatedAt = DateTime.UtcNow;
                    _setting.UpdatedBy = HttpContext.Request.Headers["UserId"];

                    ObjectResult _validate = this.ValidateSetting(_setting);
                    if (_validate.StatusCode != (int)HttpStatusCode.OK)
                    {
                        return _validate;
                    }

                    var result = this._settingsRepository.UpdateSetting(_setting);
                    if (result.Result != null)
                    {
                        return Ok(result.Result);
                    }
                    else
                    {
                        return BadRequest(result.Exception);
                    }
                }
                else
                {
                    return NotFound();
                }
            }
            return StatusCode((int)HttpStatusCode.Forbidden, null);
        }
    }
}
