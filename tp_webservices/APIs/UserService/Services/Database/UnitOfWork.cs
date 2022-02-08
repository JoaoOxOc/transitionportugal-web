using CommonLibrary.Entities;
using Microsoft.AspNetCore.Identity;
using UserService.Entities;
using UserService.Repositories;

namespace UserService.Services.Database
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(DatabaseContext context)
        {
            dbContext = context;
        }

        public void Save()
        {
            dbContext.SaveChanges();
        }

        public void Dispose()
        {
            dbContext.Dispose();
        }

        private IGenericRepository<User> _userRepository;
        private IGenericRepository<Association> _associationRepository;
        private IGenericRepository<RoleScope> _roleScopeRepository;
        private IGenericRepository<Scope> _scopeRepository;
        private IGenericRepository<Setting> _settingRepository;
        private IGenericRepository<IdentityRole> _identityRoleRepository;

        private readonly DatabaseContext dbContext;

        public IGenericRepository<User> UserRepository
        {
            get
            {
                return _userRepository = _userRepository ?? new GenericRepository<User>(dbContext);
            }
        }

        public IGenericRepository<Setting> SettingRepository
        {
            get
            {
                return _settingRepository = _settingRepository ?? new GenericRepository<Setting>(dbContext);
            }
        }

        public IGenericRepository<Association> AssociationRepository
        {
            get
            {
                return _associationRepository = _associationRepository ?? new GenericRepository<Association>(dbContext);
            }
        }

        public IGenericRepository<RoleScope> RoleScopeRepository
        {
            get
            {
                return _roleScopeRepository = _roleScopeRepository ?? new GenericRepository<RoleScope>(dbContext);
            }
        }

        public IGenericRepository<Scope> ScopeRepository
        {
            get
            {
                return _scopeRepository = _scopeRepository ?? new GenericRepository<Scope>(dbContext);
            }
        }

        public IGenericRepository<IdentityRole> IdentityRoleRepository
        {
            get
            {
                return _identityRoleRepository = _identityRoleRepository ?? new GenericRepository<IdentityRole>(dbContext);
            }
        }
    }
}
