

using System.Text.Json;

namespace UserService.Models
{
    public class TermsModel
    {
        public int? Id { get; set; }

        public decimal? Version { get; set; }

        public bool? IsActive { get; set; }

        public List<TermsDataModel>? TermsLanguages { get; set; }

        public class TermsDataModel
        {
            public string LangCode { get; set; }

            public string TermsData { get; set; }
        }
    }
}
