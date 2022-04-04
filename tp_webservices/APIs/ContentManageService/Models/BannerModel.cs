using System.Text.Json;

namespace ContentManageService.Models
{
    public class BannerModel
    {
        public int? Id { get; set; }

        public string LangCode { get; set; }

        public string PageKey { get; set; }

        public JsonDocument BannerData { get; set; }

        public string? BannerDataHtml { get; set; }

        public bool? IsDraft { get; set; }
    }
}
