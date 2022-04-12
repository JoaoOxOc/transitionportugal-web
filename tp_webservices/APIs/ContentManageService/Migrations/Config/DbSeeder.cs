using ContentManageService.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace ContentManageService.Migrations.Config
{
    public class DbSeeder
    {
        private readonly ModelBuilder _modelBuilder;

        public DbSeeder(ModelBuilder modelBuilder)
        {
            this._modelBuilder = modelBuilder;
        }


        /// <summary>
        /// Seeds database with data. It creates an insert script when the migration is generated
        /// </summary>
        public void Seed()
        {
            var options = new JsonDocumentOptions
            {
                AllowTrailingCommas = true
            };

            #region Banners

            _modelBuilder.Entity<Banner>().HasData(
                new Banner { Id = 1, IsDraft = false, PageKey = "aboutheadline", CreatedAt = DateTime.Now }
            );

            _modelBuilder.Entity<BannerTranslation>().HasData(
                new BannerTranslation { LangKey = "pt-pt", BannerId = 1, BannerDataJson = JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner cabeçalho\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"primeiro elemento\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"texto do primeiro elemento\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new JsonDocumentOptions{ AllowTrailingCommas = true }) },
                new BannerTranslation { LangKey = "en-us", BannerId = 1, BannerDataJson = JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner header\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"first item\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"first item text\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new JsonDocumentOptions { AllowTrailingCommas = true }) }
            );

            #endregion


        }
    }
}
