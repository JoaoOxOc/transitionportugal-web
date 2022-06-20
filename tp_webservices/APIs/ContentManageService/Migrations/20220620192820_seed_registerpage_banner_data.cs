using System;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContentManageService.Migrations
{
    public partial class seed_registerpage_banner_data : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Banner",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "OrderPosition" },
                values: new object[] { new DateTime(2022, 6, 20, 20, 28, 20, 56, DateTimeKind.Local).AddTicks(2742), 0 });

            migrationBuilder.InsertData(
                table: "Banner",
                columns: new[] { "Id", "ComponentKey", "CreatedAt", "CreatedBy", "IsDraft", "OrderPosition", "PageKey", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { 2, null, new DateTime(2022, 6, 20, 20, 28, 20, 56, DateTimeKind.Local).AddTicks(2781), null, false, 0, "registerpage", null, null },
                    { 3, "slider", new DateTime(2022, 6, 20, 20, 28, 20, 56, DateTimeKind.Local).AddTicks(2784), null, false, 0, "registerpage", null, null },
                    { 4, "slider", new DateTime(2022, 6, 20, 20, 28, 20, 56, DateTimeKind.Local).AddTicks(2787), null, false, 1, "registerpage", null, null },
                    { 5, "slider", new DateTime(2022, 6, 20, 20, 28, 20, 56, DateTimeKind.Local).AddTicks(2789), null, false, 2, "registerpage", null, null },
                    { 6, "bottomList", new DateTime(2022, 6, 20, 20, 28, 20, 56, DateTimeKind.Local).AddTicks(2792), null, false, 0, "registerpage", null, null }
                });

            migrationBuilder.UpdateData(
                table: "BannerTranslation",
                keyColumn: "Id",
                keyValue: 1,
                column: "BannerDataJson",
                value: System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner cabeçalho\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"primeiro elemento\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"texto do primeiro elemento\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()));

            migrationBuilder.UpdateData(
                table: "BannerTranslation",
                keyColumn: "Id",
                keyValue: 2,
                column: "BannerDataJson",
                value: System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner header\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"first item\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"first item text\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()));

            migrationBuilder.InsertData(
                table: "BannerTranslation",
                columns: new[] { "Id", "BannerDataHtml", "BannerDataJson", "BannerId", "LangKey", "PageKey" },
                values: new object[,]
                {
                    { 3, null, System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner cabeçalho\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"primeiro elemento\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"texto do primeiro elemento\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()), 4, "pt-pt", "registerpage" },
                    { 4, null, System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner header\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"first item\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"first item text\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()), 4, "en-us", "registerpage" },
                    { 5, null, System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner cabeçalho\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"primeiro elemento\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"texto do primeiro elemento\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()), 5, "pt-pt", "registerpage" },
                    { 6, null, System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner header\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"first item\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"first item text\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()), 5, "en-us", "registerpage" },
                    { 7, null, System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner cabeçalho\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"primeiro elemento\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"texto do primeiro elemento\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()), 6, "pt-pt", "registerpage" },
                    { 8, null, System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner header\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"first item\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"first item text\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()), 6, "en-us", "registerpage" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Banner",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Banner",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "BannerTranslation",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "BannerTranslation",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "BannerTranslation",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "BannerTranslation",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "BannerTranslation",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "BannerTranslation",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Banner",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Banner",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Banner",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.UpdateData(
                table: "Banner",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "OrderPosition" },
                values: new object[] { new DateTime(2022, 6, 19, 9, 58, 0, 96, DateTimeKind.Local).AddTicks(7936), null });

            migrationBuilder.UpdateData(
                table: "BannerTranslation",
                keyColumn: "Id",
                keyValue: 1,
                column: "BannerDataJson",
                value: System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner cabeçalho\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"primeiro elemento\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"texto do primeiro elemento\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()));

            migrationBuilder.UpdateData(
                table: "BannerTranslation",
                keyColumn: "Id",
                keyValue: 2,
                column: "BannerDataJson",
                value: System.Text.Json.JsonDocument.Parse("{\n    \"blocks\": [\n        {\n            \"id\" : \"VDwuz33oJn\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"banner header\",\n                \"level\" : 2\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"header\",\n            \"data\" : {\n                \"text\" : \"first item\",\n                \"level\" : 3\n            }\n        },\n        {\n            \"id\" : \"vFad3244\",\n            \"type\" : \"paragraph\",\n            \"data\" : {\n                \"text\" : \"first item text\",\n                \"headerId\" : \"vFad3244\"\n            }\n        }\n    ]\n}", new System.Text.Json.JsonDocumentOptions()));
        }
    }
}
