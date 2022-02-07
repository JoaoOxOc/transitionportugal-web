using UserService.Entities;
using UserService.Repositories;

namespace UserService.Services.Database
{
    public interface IUnitOfWork
    {
        IGenericRepository<User> UserRepository { get; }
        IGenericRepository<RefreshToken> RefreshTokenRepository { get; }
        IGenericRepository<Association> AssociationRepository { get; }
        IGenericRepository<Role> RoleRepository { get; }
        IGenericRepository<Scope> ScopeRepository { get; }

        void Save();
    }
}
