using CommonLibrary.Entities;
using CommonLibrary.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UserService.Entities;
using UserService.Enum;
using UserService.Services.Database;
using UserService.Services.UserManager;

namespace UserService.Migrations.Config
{
    public class DbInitializer
    {
        private readonly ModelBuilder modelBuilder;
        private readonly ITokenManager _tokenManager;

        public DbInitializer(ModelBuilder modelBuilder, ITokenManager tokenManager)
        {
            this.modelBuilder = modelBuilder;
            this._tokenManager = tokenManager;
        }

        public void Seed()
        {
            #region Client credentials

            modelBuilder.Entity<ClientCredential>().HasData(
                new ClientCredential { Id = 1, Name = "tpbackoffice", ClientId= "tpbackoffice", Description="transição portugal backoffice", ClientSecret = _tokenManager.GetClientToken().Token },
                new ClientCredential { Id = 2, Name = "tphome", ClientId = "tphome", Description = "transição portugal homepage", ClientSecret = _tokenManager.GetClientToken().Token }
            );

            #endregion

            #region Roles

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf", Name = "Admin" },
                new IdentityRole { Id = "244d3f1a-8594-4adb-9c59-5ec36fcdbf03", Name = "AssociationAdmin" },
                new IdentityRole { Id = "179642d9-0f10-4d7d-a1a0-b485b3f6659f", Name = "User" },
                new IdentityRole { Id = "69d5274f-235d-4013-bbac-0c4eddf31ecc", Name = "AssociationUser" }
            );

            #endregion

            #region Scopes

            modelBuilder.Entity<Scope>().HasData(
                new Scope { Id = 1, ScopeName = "user.read", Description = "Read only of he's own user data"},
                new Scope { Id = 2, ScopeName = "user.write", Description = "Read/write of he's own user data"},
                new Scope { Id = 3, ScopeName = "users.write", Description = "Read/write of users data"},
                new Scope { Id = 4, ScopeName = "associationusers.write", Description = "Read/write of association users data"}
            );

            #endregion

            #region RoleScopes

            modelBuilder.Entity<RoleScope>().HasData(
                new RoleScope
                {
                    Id = 1,
                    RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                    ScopeId = 1
                },
                new RoleScope
                {
                    Id = 2,
                    RoleId = "244d3f1a-8594-4adb-9c59-5ec36fcdbf03",
                    ScopeId = 1
                },
                new RoleScope
                {
                    Id = 3,
                    RoleId = "179642d9-0f10-4d7d-a1a0-b485b3f6659f",
                    ScopeId = 1
                },
                new RoleScope
                {
                    Id = 4,
                    RoleId = "69d5274f-235d-4013-bbac-0c4eddf31ecc",
                    ScopeId = 1
                },
                new RoleScope
                {
                    Id=5,
                    RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                    ScopeId = 2
                },
                new RoleScope
                {
                    Id=6,
                    RoleId = "244d3f1a-8594-4adb-9c59-5ec36fcdbf03",
                    ScopeId = 2
                },
                new RoleScope
                {
                    Id=7,
                    RoleId = "179642d9-0f10-4d7d-a1a0-b485b3f6659f",
                    ScopeId = 2
                },
                new RoleScope
                {
                    Id=8,
                    RoleId = "69d5274f-235d-4013-bbac-0c4eddf31ecc",
                    ScopeId = 2
                },
                new RoleScope
                {
                    Id = 9,
                    RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                    ScopeId = 3
                },
                new RoleScope
                {
                    Id = 10,
                    RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf" ,
                    ScopeId = 4
                },
                new RoleScope
                {
                    Id = 11,
                    RoleId = "244d3f1a-8594-4adb-9c59-5ec36fcdbf03",
                    ScopeId = 4
                }
            );

            #endregion

            #region Users

            modelBuilder.Entity<User>().HasData(
                new User { Id= "b74ddd14-6340-4840-95c2-db12554843e5", NormalizedUserName = "Administrator", UserName = "admin", Email = "admin@tp.int", PasswordHash = BCrypt.Net.BCrypt.HashPassword("123"), IsVerified = true, IsActive = true, CreatedAt = DateTime.Now }
            );

            #endregion

            #region Users Roles

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>() { RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf", UserId = "b74ddd14-6340-4840-95c2-db12554843e5" }
            );

            #endregion

            #region Settings

            modelBuilder.Entity<Setting>().HasData(
                new Setting() { Id = 1, Key = SettingCode.MaxLoginAttempts.ToString(), DefaultValue = "3", Value = "3", Description = "Número máximo de tentativas de autenticação falhadas", SettingType = (int)SettingsType.USER, CreatedAt = DateTime.Now },
                new Setting() { Id = 2, Key = SettingCode.CaptchaSiteKey.ToString(), DefaultValue = "6Lf2t0sUAAAAABiszBasjJuBZXTdqMy00zOKPOFt", Value = "6Lf2t0sUAAAAABiszBasjJuBZXTdqMy00zOKPOFt", Description = "Site key usada pelo serviço de reCAPTCHA da Google", SettingType = (int)SettingsType.USER, CreatedAt = DateTime.Now },
                new Setting() { Id = 3, Key = SettingCode.CaptchaSecretKey.ToString(), DefaultValue = "6Lf2t0sUAAAAAPwP3kIvpynFqPp-7_QLfQoDQtZd", Value = "6Lf2t0sUAAAAAPwP3kIvpynFqPp-7_QLfQoDQtZd", Description = "Secret key usada pelo serviço de reCAPTCHA da Google", SettingType = (int)SettingsType.USER, CreatedAt = DateTime.Now }
            );

            #endregion

            
        }
    }
}
