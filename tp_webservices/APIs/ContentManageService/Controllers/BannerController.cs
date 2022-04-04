using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Enums;
using CommonLibrary.Extensions;
using ContentManageService.Entities;
using ContentManageService.Models;
using ContentManageService.Services.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Text.Json;

namespace ContentManageService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannerController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public BannerController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        private ObjectResult ValidateBanner(Banner banner)
        {
            if (banner.PageKey == null || string.IsNullOrWhiteSpace(banner.PageKey.Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }

            Expression<Func<Banner, bool>> filter = (x => x.Id != banner.Id && x.PageKey.Equals(banner.PageKey));

            var existsBanner = this._uow.BannerRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
            if (existsBanner != null)
            {
                ConflictModel conflict = new ConflictModel();
                conflict.ConflictType = ConflictType.DuplicateValue;
                conflict.Entity = typeof(Banner).Name;

                if (existsBanner.PageKey == banner.PageKey)
                {
                    conflict.Field = typeof(Banner).GetProperty("PageKey").Name;
                }

                return Conflict(conflict);
            }

            return Ok(null);
        }

        private ObjectResult ValidateBannerTranslation(BannerTranslation bannerTranslation)
        {
            if (bannerTranslation.LangKey == null || string.IsNullOrWhiteSpace(bannerTranslation.LangKey.Trim()))
            {
                return UnprocessableEntity("MandatoryFields");
            }

            Expression<Func<BannerTranslation, bool>> filter = (x => x.LangKey == bannerTranslation.LangKey && x.BannerId == bannerTranslation.BannerId);

            var existsBanner = this._uow.BannerTranslationRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
            if (existsBanner != null)
            {
                ConflictModel conflict = new ConflictModel();
                conflict.ConflictType = ConflictType.DuplicateValue;
                conflict.Entity = typeof(BannerTranslation).Name;

                if (existsBanner.LangKey == bannerTranslation.LangKey)
                {
                    conflict.Field = typeof(BannerTranslation).GetProperty("LangKey").Name;
                }

                return Conflict(conflict);
            }

            return Ok(null);
        }

        private BannerModel ParseEntityToModel(BannerTranslation bannerData)
        {
            BannerModel model = new BannerModel();
            if (bannerData != null)
            {
                model.BannerData = bannerData.BannerDataJson;
                model.BannerDataHtml = bannerData.BannerDataHtml;
                model.Id = bannerData.BannerId;
                model.LangCode = bannerData.LangKey;
                model.IsDraft = bannerData.Banner?.IsDraft;
                model.PageKey = bannerData.Banner?.PageKey;
            }
            return model;
        }

        private List<BannerModel> ParseEntitiesToModel(List<BannerTranslation> bannersData)
        {
            List<BannerModel> models = new List<BannerModel>();
            foreach (var banner in bannersData)
            {
                models.Add(ParseEntityToModel(banner));
            }
            return models;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string? searchText, string? langCode, string? pageKey, bool? isActive, int? offset, int? limit, string sort, string sortDirection)
        {
            string userId = HttpContext.Request.Headers["UserId"];
            string userRole = HttpContext.Request.Headers["UserRole"];
            List<string> scopes = !string.IsNullOrEmpty(HttpContext.Request.Headers["UserClaims"]) ? JsonSerializer.Deserialize<List<string>>(HttpContext.Request.Headers["UserClaims"]) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userRole, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "cms.read", "cms.write" }))
            {
                try
                {
                    offset = offset ?? 1;

                    string parsedLangKey = !string.IsNullOrEmpty(langCode) ? langCode.ToLower() : "en-us";
                    pageKey = pageKey ?? "";
                    searchText = searchText == null ? string.Empty : searchText.Trim().ToLower();
                    sort = sort ?? "Name";
                    isActive = isActive ?? false;
                    SortDirection direction = sortDirection == "desc" ? SortDirection.Descending : SortDirection.Ascending;

                    Expression<Func<BannerTranslation, bool>> filter = (x => x.Banner.PageKey.ToLower().Contains(pageKey) && x.LangKey.Contains(parsedLangKey) && x.Banner.IsDraft == !isActive);

                    var _bannerData = _uow.BannerTranslationRepository.Get(offset, limit, filter, sort, direction, "Banner");

                    int totalCount = _uow.BannerTranslationRepository.Count(filter);

                    Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                    return _bannerData != null ? Ok(new
                    {
                        banners = ParseEntitiesToModel(_bannerData)
                    })
                    : NotFound(new List<BannerModel>());
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message + "| stacktrace: " + ex.StackTrace);
                }
            }
            return StatusCode(StatusCodes.Status403Forbidden, null);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            string userId = HttpContext.Request.Headers["UserId"];
            string userRole = HttpContext.Request.Headers["UserRole"];
            List<string> scopes = !string.IsNullOrEmpty(HttpContext.Request.Headers["UserClaims"]) ? JsonSerializer.Deserialize<List<string>>(HttpContext.Request.Headers["UserClaims"]) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(userRole, new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "cms.read", "cms.write" }))
            {
                try
                {
                    Expression<Func<BannerTranslation, bool>> filter = (x => x.BannerId == id);

                    var _bannerData = _uow.BannerTranslationRepository.Get(null, null, filter, "LangKey", SortDirection.Ascending, "Banner");

                    return _bannerData != null ? Ok(new
                    {
                        bannerDataLangs = ParseEntitiesToModel(_bannerData)
                    })
                    : NotFound(null);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, null);
                }
            }
            return StatusCode(StatusCodes.Status403Forbidden, null);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Put([FromBody] BannerModel model)
        {
            List<string> scopes = !string.IsNullOrEmpty(HttpContext.Request.Headers["UserClaims"]) ? JsonSerializer.Deserialize<List<string>>(HttpContext.Request.Headers["UserClaims"]) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(HttpContext.Request.Headers["UserRole"], new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "cms.write" }))
            {
                Expression<Func<Banner, bool>> filter = (x => x.Id == model.Id);

                var banner = this._uow.BannerRepository.Get(null, null, filter, string.Empty, SortDirection.Ascending).FirstOrDefault();
                if (banner != null)
                {
                    banner.PageKey = model.PageKey;
                    banner.IsDraft = model.IsDraft;
                    banner.UpdatedAt = DateTime.UtcNow;
                    banner.UpdatedBy = HttpContext.Request.Headers["UserId"];

                    ObjectResult _validate = this.ValidateBanner(banner);
                    if (_validate.StatusCode != StatusCodes.Status200OK)
                    {
                        return _validate;
                    }

                    Expression<Func<BannerTranslation, bool>> filterTranslation = (x => x.LangKey == model.LangCode && x.BannerId == model.Id);
                    var bannerTranslation = this._uow.BannerTranslationRepository.Get(null, null, filterTranslation, string.Empty, SortDirection.Ascending).FirstOrDefault();
                    if (bannerTranslation != null)
                    {
                        bannerTranslation.BannerDataJson = model.BannerData;
                        bannerTranslation.BannerDataHtml = model.BannerDataHtml;

                        ObjectResult _validateTranslation = this.ValidateBannerTranslation(bannerTranslation);
                        if (_validateTranslation.StatusCode != StatusCodes.Status200OK)
                        {
                            return _validateTranslation;
                        }

                        try
                        {
                            _uow.BannerRepository.Update(banner);
                            _uow.BannerTranslationRepository.Update(bannerTranslation);
                            _uow.Save();

                            return Ok(new
                            {
                                bannerPageKey = banner.PageKey,
                                bannerId = banner.Id,
                                langCode = bannerTranslation.LangKey
                            });
                        }
                        catch (Exception ex)
                        {
                            return StatusCode(StatusCodes.Status500InternalServerError, null);
                        }
                    }
                }
                else
                {
                    return NotFound();
                }
            }
            return StatusCode(StatusCodes.Status403Forbidden, null);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterBanner([FromBody] BannerModel model)
        {
            List<string> scopes = !string.IsNullOrEmpty(HttpContext.Request.Headers["UserClaims"]) ? JsonSerializer.Deserialize<List<string>>(HttpContext.Request.Headers["UserClaims"]) : null;

            if (PermissionsHelper.ValidateRoleClaimPermission(HttpContext.Request.Headers["UserRole"], new List<string> { "Admin" })
                && PermissionsHelper.ValidateUserScopesPermissionAll(scopes, new List<string> { "cms.write" }))
            {
                Banner banner = new Banner();

                banner.PageKey = model.PageKey;
                banner.IsDraft = model.IsDraft;
                banner.CreatedAt = DateTime.UtcNow;
                banner.CreatedBy = HttpContext.Request.Headers["UserId"];

                ObjectResult _validate = this.ValidateBanner(banner);
                if (_validate.StatusCode != StatusCodes.Status200OK)
                {
                    return _validate;
                }

                try
                {
                    _uow.BannerRepository.Add(banner);

                    _uow.Save();

                    return Ok(new
                    {
                        bannerPageKey = banner.PageKey,
                        bannerId = banner.Id
                    });
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, null);
                }
            }
            return StatusCode(StatusCodes.Status403Forbidden, null);
        }
    }
}
