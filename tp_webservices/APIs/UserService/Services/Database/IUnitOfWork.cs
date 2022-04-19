using CommonLibrary.Entities;
using Microsoft.AspNetCore.Identity;
using UserService.Entities;
using UserService.Repositories;

namespace UserService.Services.Database
{
    public interface IUnitOfWork
    {
        IGenericRepository<User> UserRepository { get; }
        IGenericRepository<IdentityRole> IdentityRoleRepository { get; }
        IGenericRepository<IdentityUserRole<string>> IdentityUserRoleRepository { get; }
        IGenericRepository<Association> AssociationRepository { get; }
        IGenericRepository<TermsConditions> TermsConditionsRepository { get; }
        IGenericRepository<TermsConditionsTranslation> TermsConditionsTranslationRepository { get; }
        IGenericRepository<RoleScope> RoleScopeRepository { get; }
        IGenericRepository<Scope> ScopeRepository { get; }
        IGenericRepository<Setting> SettingRepository { get; }
        IGenericRepository<ClientCredential> ClientCredentialRepository { get; }

        void Save();
    }
}
