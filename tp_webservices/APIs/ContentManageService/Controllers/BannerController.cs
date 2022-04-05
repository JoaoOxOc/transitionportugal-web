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

        private BannerModel ParseEntityToModel(BannerModel bannerData, BannerTranslation bannerTranslationData)
        {
            BannerModel model = null;
            if (bannerTranslationData != null)
            {
                if (bannerData == null)
                {
                    model = new BannerModel();
                    model.Id = bannerTranslationData.BannerId;
                    model.IsDraft = bannerTranslationData.Banner?.IsDraft;
                    model.PageKey = bannerTranslationData.Banner?.PageKey;
                    model.BannerLanguages = new List<BannerModel.BannerDataModel>();
                    model.BannerLanguages.Add(new BannerModel.BannerDataModel
                    {
                        LangCode = bannerTranslationData.LangKey,
                        BannerData = bannerTranslationData.BannerDataJson,
                        BannerDataHtml = bannerTranslationData.BannerDataHtml
                    });
                }
                else
                {
                    if (!bannerData.BannerLanguages.Any(x => x.LangCode == bannerTranslationData.LangKey))
                    {
                        bannerData.BannerLanguages.Add(new BannerModel.BannerDataModel
                        {
                            LangCode = bannerTranslationData.LangKey,
                            BannerData = bannerTranslationData.BannerDataJson,
                            BannerDataHtml = bannerTranslationData.BannerDataHtml
                        });
                    }
                }
            }
            return model;
        }

        private List<BannerModel> ParseEntitiesToModel(List<BannerTranslation> bannersTranslationData)
        {
            List<BannerModel> models = new List<BannerModel>();
            foreach (var bannerTranslation in bannersTranslationData)
            {
                var model = ParseEntityToModel(models.Find(x => x.Id == bannerTranslation.BannerId), bannerTranslation);
                if (model != null)
                {
                    models.Add(model);
                }
            }
            return models;
        }

        private KeyValuePair<List<BannerTranslation>, List<BannerTranslation>> ProcessBannerTranslations(Banner bannerData, List<BannerModel.BannerDataModel> translationsModel)
        {
            KeyValuePair<List<BannerTranslation>, List<BannerTranslation>> translationsProcessed = new KeyValuePair<List<BannerTranslation>, List<BannerTranslation>>();
            if (translationsModel != null)
            {
                List<BannerTranslation> toUpdate = new List<BannerTranslation>();
                List<BannerTranslation> toCreate = new List<BannerTranslation>();
                foreach (var translation in translationsModel)
                {
                    Expression<Func<BannerTranslation, bool>> filterTranslation = (x => x.LangKey == translation.LangCode && x.BannerId == bannerData.Id);
                    var bannerTranslation = this._uow.BannerTranslationRepository.Get(null, null, filterTranslation, string.Empty, SortDirection.Ascending).FirstOrDefault();
                    if (bannerTranslation != null)
                    {
                        toUpdate.Add(bannerTranslation);
                    }
                    else
                    {
                        BannerTranslation newTranslation = new BannerTranslation();
                        newTranslation.BannerId = bannerData.Id;
                        newTranslation.LangKey = translation.LangCode;
                        newTranslation.BannerDataHtml = translation.BannerDataHtml;
                        newTranslation.BannerDataJson = translation.BannerData;

                        toCreate.Add(newTranslation);
                    }
                }
                translationsProcessed = new KeyValuePair<List<BannerTranslation>, List<BannerTranslation>>(toUpdate, toCreate);
            }
            return translationsProcessed;
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

        [HttpGet]
        [Route("public")]
        public async Task<IActionResult> GetPublicBanners(string? pageKey, string? langCode)
        {
            try
            {
                string parsedLangKey = !string.IsNullOrEmpty(langCode) ? langCode.ToLower() : "en-us";
                pageKey = pageKey ?? "aboutheadline";

                Expression<Func<BannerTranslation, bool>> filter = (x => x.Banner.PageKey.ToLower().Contains(pageKey) && x.LangKey.Contains(parsedLangKey) && x.Banner.IsDraft == false);

                var _bannerData = _uow.BannerTranslationRepository.Get(null, null, filter, "LangKey", SortDirection.Ascending, "Banner").FirstOrDefault();
                if (_bannerData == null)
                {
                    //try to get any without the language key
                    filter = (x => x.Banner.PageKey.ToLower().Contains(pageKey) && x.Banner.IsDraft == false);

                    _bannerData = _uow.BannerTranslationRepository.Get(null, null, filter, "LangKey", SortDirection.Ascending, "Banner").FirstOrDefault();
                }

                int totalCount = _uow.BannerTranslationRepository.Count(filter);

                Request.HttpContext.Response.Headers.Add("X-Total-Count", totalCount.ToString());

                return _bannerData != null ? Ok(new
                {
                    banners = ParseEntitiesToModel(new List<BannerTranslation> { _bannerData })
                })
                : NotFound(new List<BannerModel>());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message + "| stacktrace: " + ex.StackTrace);
            }
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
                        banner = ParseEntitiesToModel(_bannerData)
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

                    try
                    {
                        _uow.BannerRepository.Update(banner);

                        var updateCreatePairs = ProcessBannerTranslations(banner, model.BannerLanguages);

                        if (updateCreatePairs.Key != null && updateCreatePairs.Key.Count > 0)
                        {
                            _uow.BannerTranslationRepository.Update(updateCreatePairs.Key);
                        }
                        if (updateCreatePairs.Value != null && updateCreatePairs.Value.Count > 0)
                        {
                            _uow.BannerTranslationRepository.Add(updateCreatePairs.Value);
                        }
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

                    var updateCreatePairs = ProcessBannerTranslations(banner, model.BannerLanguages);

                    if (updateCreatePairs.Key != null && updateCreatePairs.Key.Count > 0)
                    {
                        _uow.BannerTranslationRepository.Update(updateCreatePairs.Key);
                    }
                    if (updateCreatePairs.Value != null && updateCreatePairs.Value.Count > 0)
                    {
                        _uow.BannerTranslationRepository.Add(updateCreatePairs.Value);
                    }

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
