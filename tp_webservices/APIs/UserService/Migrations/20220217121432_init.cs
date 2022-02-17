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
                    { "179642d9-0f10-4d7d-a1a0-b485b3f6659f", "a03ecbd4-7154-4f91-b999-0ef2fb0ab278", "User", null },
                    { "244d3f1a-8594-4adb-9c59-5ec36fcdbf03", "e6057a07-d29d-426d-b031-3ea2c71f5344", "AssociationAdmin", null },
                    { "69d5274f-235d-4013-bbac-0c4eddf31ecc", "a1a84a62-4885-4939-8f37-0f4fc71e159a", "AssociationUser", null },
                    { "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf", "cf21aab3-0aaa-4114-8e09-1f1f420145c2", "Admin", null }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "AssociationId", "ConcurrencyStamp", "CreatedAt", "CreatedBy", "Email", "EmailConfirmed", "IsActive", "IsVerified", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RefreshToken", "RefreshTokenExpiryTime", "SecurityStamp", "TwoFactorEnabled", "UpdatedAt", "UpdatedBy", "UserName" },
                values: new object[] { "b74ddd14-6340-4840-95c2-db12554843e5", 0, null, "cbf3dca2-e886-4862-9905-5f3ca7f0a42d", new DateTime(2022, 2, 17, 12, 14, 31, 835, DateTimeKind.Local).AddTicks(5262), null, "admin@tp.int", false, true, true, false, null, null, "Administrator", "$2b$10$T0XCgQEZnNvnUYsPmlGl0OwYZGnSScaQzshjgTAHfmpizLo.psp2O", null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "322f9a5e-27a0-4e1d-9b80-d31829a10a01", false, null, null, "admin" });

            migrationBuilder.InsertData(
                table: "ClientCredential",
                columns: new[] { "Id", "ClientId", "ClientSecret", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "tpbackoffice", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYmQyYWQ5My1iMTY2LTQ3YzItYWRlMS01OWNiM2U1OWIwNWQiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAifQ.fOilP5WNeFwYVFKKFqHU6HBdBHZRp_lBWAEKaKK2sp5Tfce5DkZ3oXd_Rtna_HV73uwIAS_0EOvS-KEy3G3Ea3pZTtAUeJs_ebRMn582dggQICgN06oX1MomQBFzpnbVopWmvVpdpmnILStODcufpRnX6RVPcDRkPKvkNMDqhaFVCB_ImA1m2Rek2eY47nGmfRsp9MOyczRYZHzHtGfd-KQbBl4FYI_oB3h_-dbr8KqANJo9jQMhOR_cZMbqTPtQ1LDB8ZgoavP52DGSIG2ir38RrFFHzpFEJ2iSdPQ-uecyIOygDbXXxvYCebw1zi9R49dyyEc9IRaj7Dl2qAslsWgN2Z68dghUwvP-ctq0bVNN4Oq5zHRaIFB516wsQduOYOm__gaIT5nMhMtC19EJeupjEM-dAsN4gj8IbkWSavE6I7v-1jxCevPLTasmRwOetllq7aTNLAAsv98UyGawcFbeG3JcNScLc_i1Cypft4ezrqGmA5S0KrjmTRbTJSUwO3RdM-Pj_YrNXUtkXzW-b1CERrslsV-fUV_qkH2AVvV2Z31e1OksdfUxdqubhcYSwHWmB5YEipe13kLEEamwuOkp2t6eW5xB4ZJbMC5RReWrdzHnrG74JKFnIq4yU7-aLX1z88ekvNAnI5sYvhgNUNBSC0hYRbn51BuVheL2YtE", "transição portugal backoffice", "tpbackoffice" },
                    { 2, "tphome", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NGYzZTllYi03YjBlLTQ3ODgtYmE1OS01YmNmNDJkNGZmZWYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAifQ.YnZhWhNm82PoUWORjtjsaUi4CqnTLP2y7u5sjminnxyhXlTx3y50RkmGzyW80ghfjnstWowScZ64S-l4EQr29dAVkQDT0bz6K3Sl5sy2IPE2DAuxfWhToAwCi9v30ZhiRkrMSoFAaXIkHiBISrg7sH0R9za3ruzckMQ6cw6buu3n4EhpXQAJH1Ap49579GzH5Qd2LxAZkLI0G8_GM790uJFrOGS5rmoFUP_LjhVZkEXUZuOarh6nu5vHE4xknFMRW4JV7gPkX7FLRf1-9erVnk_s9QlsVMF-SgahMZmJbjUx3h6IIyCPb5AEiTiExKJdEpY3YWtkm0FD34ZgkmDfNQkM3jCSEe8KxhV4Y2WKaktqslxayGwUi20k1Q-69Nlt2hWHgfAsnXUEfKwlNN73sDn5LabK4IjmYmlY2IGf-2jHRQnaKHqxkczRboQFjNoLL6Gq9X7SOT4bFpaP717-r_7KEIiZx9_yw-isrm8umGMMu5uxj5XwcGzxqUHaVxDV-EvgkpDwsP3MR7DXpWePmgIrDAVhRRHP5o9fHWRqQyxypg_Fx-SnP9gVnf48nqLdxiTiM7A9Qabc37L-mY0rOCnM1DtTnZRuHF7gTjRpirduiWkifhf8P4WftWGya5Z5D5ftGqpBlDht6jK4FK2Ju5dREkVE7aNg0f7eUsCFrLo", "transição portugal homepage", "tphome" }
                });

            migrationBuilder.InsertData(
                table: "Scope",
                columns: new[] { "Id", "Description", "ScopeName" },
                values: new object[,]
                {
                    { 1, "Read only of he's own user data", "user.read" },
                    { 2, "Read/write of he's own user data", "user.write" },
                    { 3, "Read/write of users data", "users.write" },
                    { 4, "Read/write of association users data", "associationusers.write" }
                });

            migrationBuilder.InsertData(
                table: "Setting",
                columns: new[] { "Id", "CreatedAt", "DefaultValue", "Description", "Key", "SettingType", "UpdatedAt", "Value" },
                values: new object[,]
                {
                    { 1, new DateTime(2022, 2, 17, 12, 14, 31, 835, DateTimeKind.Local).AddTicks(5800), "3", "Número máximo de tentativas de autenticação falhadas", "MaxLoginAttempts", 3, null, "3" },
                    { 2, new DateTime(2022, 2, 17, 12, 14, 31, 835, DateTimeKind.Local).AddTicks(5807), "6Lf2t0sUAAAAABiszBasjJuBZXTdqMy00zOKPOFt", "Site key usada pelo serviço de reCAPTCHA da Google", "CaptchaSiteKey", 3, null, "6Lf2t0sUAAAAABiszBasjJuBZXTdqMy00zOKPOFt" },
                    { 3, new DateTime(2022, 2, 17, 12, 14, 31, 835, DateTimeKind.Local).AddTicks(5809), "6Lf2t0sUAAAAAPwP3kIvpynFqPp-7_QLfQoDQtZd", "Secret key usada pelo serviço de reCAPTCHA da Google", "CaptchaSecretKey", 3, null, "6Lf2t0sUAAAAAPwP3kIvpynFqPp-7_QLfQoDQtZd" }
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
                    { 11, "244d3f1a-8594-4adb-9c59-5ec36fcdbf03", 4 }
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
