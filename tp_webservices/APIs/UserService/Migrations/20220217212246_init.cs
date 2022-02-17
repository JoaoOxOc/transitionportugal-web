using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace UserService.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Association",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Town = table.Column<string>(type: "text", nullable: false),
                    PostalCode = table.Column<string>(type: "text", nullable: false),
                    Vat = table.Column<string>(type: "text", nullable: false),
                    LogoImage = table.Column<string>(type: "text", nullable: false),
                    Filename = table.Column<string>(type: "text", nullable: false),
                    ContractStartDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    ContractEndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: true),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: true),
                    IsEmailVerified = table.Column<bool>(type: "boolean", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Association", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ClientCredential",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ClientId = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ClientSecret = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientCredential", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Scope",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ScopeName = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scope", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Setting",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Key = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    DefaultValue = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false),
                    SettingType = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Setting", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    AssociationId = table.Column<int>(type: "integer", nullable: true),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsEmailVerified = table.Column<bool>(type: "boolean", nullable: true),
                    RefreshToken = table.Column<string>(type: "text", nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_Association_AssociationId",
                        column: x => x.AssociationId,
                        principalTable: "Association",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RoleScope",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ScopeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleScope", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleScope_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleScope_Scope_ScopeId",
                        column: x => x.ScopeId,
                        principalTable: "Scope",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "179642d9-0f10-4d7d-a1a0-b485b3f6659f", "e8efaf5b-33e0-4525-8964-2f64b0a81011", "User", null },
                    { "244d3f1a-8594-4adb-9c59-5ec36fcdbf03", "cb8c8c74-9bb0-41e3-9f2e-2612fdfe85a5", "AssociationAdmin", null },
                    { "69d5274f-235d-4013-bbac-0c4eddf31ecc", "631837f8-eb6f-4023-8b91-0963fe7a8f6b", "AssociationUser", null },
                    { "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf", "b5273dc8-94d4-4399-a88e-e9b9b1446efa", "Admin", null }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "AssociationId", "ConcurrencyStamp", "CreatedAt", "CreatedBy", "Email", "EmailConfirmed", "IsActive", "IsEmailVerified", "IsVerified", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RefreshToken", "RefreshTokenExpiryTime", "SecurityStamp", "TwoFactorEnabled", "UpdatedAt", "UpdatedBy", "UserName" },
                values: new object[] { "b74ddd14-6340-4840-95c2-db12554843e5", 0, null, "efaafcfa-bd69-452a-9051-744f34e987b4", new DateTime(2022, 2, 17, 21, 22, 45, 817, DateTimeKind.Local).AddTicks(8873), null, "admin@tp.int", false, true, true, true, false, null, null, "Administrator", "$2b$10$7F3RRFzwCB55.KBaUkVNauq3NCJg.i9P7nPWH3qTvHisHf8SBLWz6", null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "ff7b6738-5d27-49dc-9913-522f79c24a87", false, null, null, "admin" });

            migrationBuilder.InsertData(
                table: "ClientCredential",
                columns: new[] { "Id", "ClientId", "ClientSecret", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "tpbackoffice", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZTM0ZTI1My0yYTYyLTQ4MzktODU2OC1lMmExNTdlYzQ5MmQiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAifQ.VcVdbKFJJMWCZzqJqV5g6sj4Av0gr0DFJl70FZNSCLi2sedlkJSPTZG_L5pexkmIqRL_cPHLrLintGm8ZRZP31O2Bydtmce5N9-Q_Utf3qHt7c_gYO9svQJrbVsQHEYB1x3HFtEyWVYlHIPUSD0lYB79xEoL6gh9Uij74hH8H4qtUUi7xER528NeqMDG_LYfEcIWL-2qv7aB3LKohpOXApyZMm4uQ7t9fTOr3v2d2Ey7Vj7GPpKy4QjmXY2cGtynHOzVTLWpBSdCn4SXMB7gSnkmdRgySGL_GUM9BR0ncjJ4toK25dXC2hqT5H8D1doJE3_SvU7X3W4i560wj2sfxNl9U7NYP3ms4syMc6so-0Hs8pKV9j7eUN2EiJaW6OrwdqqKsEIi-ObkRbqWDCsfntIr0HSLZFyrTqmmH4ciSiyLJb7GNK0Mzc_8VTlscJdJfPst_N1WxmYt2T7YrleOl2UC3vrBfXaYowR4v0nM-OPByr5zvVNJE0-xNHRUkJAyA92Lh2wDNWbmBHSb_ZDSC_YHwR6PLsmw_E1q4sz1WQLLZVGhOMmE2r5m81OUC3tcsxhD_vEb_tXWYn0zBh8OxeyuXcwSPxy_vm7D3I-74rBkTsVl7dJuzQhQ0RKVrmPD8pPXO4PJin8Uxio6wJcSfbEeffKXOKI6huJaOTGbkO4", "transição portugal backoffice", "tpbackoffice" },
                    { 2, "tphome", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MWRhZmJjYi1kMjYxLTRhNWEtYjVkNi1hNGNkZmE3ZTI1NzgiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAifQ.CYlZTbMdvReycXGhILg2xK1aN_eWQS7kzC65JtKfDEqJn_QB5ly6e7Yf1dTuUE_0Gew9atv4M5gLumM5P39LVGcywynRafQ9jhD6F-eNyqksVWPUwaJot1JdW8rca-AMqqli87KfooKylsDBExBRvCr55vV0fK_Ek0g6ypElp4oKRDy_bEzwRCn1Y9fNf07-ZFfUnDZphIMIeBo3CGo9k41ySEPSCtMfTLlP7tfaoxs3InNB8k5KbWBCqW9nTVHxrve01Y8BdCwzACwkp6bT5Mdf0xf-OeqJJg169SYk-CZMN6gV2EdOWfn6CSx9Bm2dK54T1Hpf_lu-hdoSDOfKCh_fxmVweD5DIbsCElHMcBaHQ453kygxzfdIjUZXQuyezqOHliEjVDY2ORLeY4s672wRwi1v4WRBADGNfSGZ1Sucvi3AP9hBfzFB4TGIrFEj5tMbvhZ-sQV84WLULRus8tfOBZzeK8ltrc-zYIQA9VwXI6WwhAWICn4Mwdr6IPpqnUYHPfqCAzQ02esh28bEv9blX2ZRq-_Aq9XNG8NBEBypyrb-fBQaKqOafLzwKdHEdgRgai_4iKa0vhhIE0ZsOMSHrAHAzEecMtnt0wAmPQhjMhygfAlN7SNlBqhqpiOJoIt43E6g6v5TGA3kTPlD4fFZBzVnQq1EsNBbpeOpqmA", "transição portugal homepage", "tphome" }
                });

            migrationBuilder.InsertData(
                table: "Scope",
                columns: new[] { "Id", "Description", "ScopeName" },
                values: new object[,]
                {
                    { 1, "Read only of he's own user data", "user.read" },
                    { 2, "Read/write of he's own user data", "user.write" },
                    { 3, "Read/write of users data", "users.write" },
                    { 4, "Read/write of association users data", "associationusers.write" },
                    { 5, "Read/write of client apps data", "client.admin" }
                });

            migrationBuilder.InsertData(
                table: "Setting",
                columns: new[] { "Id", "CreatedAt", "DefaultValue", "Description", "Key", "SettingType", "UpdatedAt", "Value" },
                values: new object[,]
                {
                    { 1, new DateTime(2022, 2, 17, 21, 22, 45, 818, DateTimeKind.Local).AddTicks(492), "3", "Número máximo de tentativas de autenticação falhadas", "MaxLoginAttempts", 3, null, "3" },
                    { 2, new DateTime(2022, 2, 17, 21, 22, 45, 818, DateTimeKind.Local).AddTicks(507), "6Lf2t0sUAAAAABiszBasjJuBZXTdqMy00zOKPOFt", "Site key usada pelo serviço de reCAPTCHA da Google", "CaptchaSiteKey", 3, null, "6Lf2t0sUAAAAABiszBasjJuBZXTdqMy00zOKPOFt" },
                    { 3, new DateTime(2022, 2, 17, 21, 22, 45, 818, DateTimeKind.Local).AddTicks(510), "6Lf2t0sUAAAAAPwP3kIvpynFqPp-7_QLfQoDQtZd", "Secret key usada pelo serviço de reCAPTCHA da Google", "CaptchaSecretKey", 3, null, "6Lf2t0sUAAAAAPwP3kIvpynFqPp-7_QLfQoDQtZd" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf", "b74ddd14-6340-4840-95c2-db12554843e5" });

            migrationBuilder.InsertData(
                table: "RoleScope",
                columns: new[] { "Id", "RoleId", "ScopeId" },
                values: new object[,]
                {
                    { 1, "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf", 1 },
                    { 2, "244d3f1a-8594-4adb-9c59-5ec36fcdbf03", 1 },
                    { 3, "179642d9-0f10-4d7d-a1a0-b485b3f6659f", 1 },
                    { 4, "69d5274f-235d-4013-bbac-0c4eddf31ecc", 1 },
                    { 5, "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf", 2 },
                    { 6, "244d3f1a-8594-4adb-9c59-5ec36fcdbf03", 2 },
                    { 7, "179642d9-0f10-4d7d-a1a0-b485b3f6659f", 2 },
                    { 8, "69d5274f-235d-4013-bbac-0c4eddf31ecc", 2 },
                    { 9, "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf", 3 },
                    { 10, "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf", 4 },
                    { 11, "244d3f1a-8594-4adb-9c59-5ec36fcdbf03", 4 },
                    { 12, "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf", 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_AssociationId",
                table: "AspNetUsers",
                column: "AssociationId");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RoleScope_RoleId",
                table: "RoleScope",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleScope_ScopeId",
                table: "RoleScope",
                column: "ScopeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "ClientCredential");

            migrationBuilder.DropTable(
                name: "RoleScope");

            migrationBuilder.DropTable(
                name: "Setting");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Scope");

            migrationBuilder.DropTable(
                name: "Association");
        }
    }
}
