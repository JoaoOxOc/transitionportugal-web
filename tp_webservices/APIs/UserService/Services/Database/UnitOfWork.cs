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
        private IGenericRepository<RefreshToken> _refreshTokenRepository;
        private IGenericRepository<Association> _associationRepository;
        private IGenericRepository<Role> _roleRepository;
        private IGenericRepository<Scope> _scopeRepository;

        private readonly DatabaseContext dbContext;

        public IGenericRepository<User> UserRepository
        {
            get
            {
                return _userRepository = _userRepository ?? new GenericRepository<User>(dbContext);
            }
        }

        public IGenericRepository<RefreshToken> RefreshTokenRepository
        {
            get
            {
                return _refreshTokenRepository = _refreshTokenRepository ?? new GenericRepository<RefreshToken>(dbContext);
            }
        }

        public IGenericRepository<Association> AssociationRepository
        {
            get
            {
                return _associationRepository = _associationRepository ?? new GenericRepository<Association>(dbContext);
            }
        }

        public IGenericRepository<Role> RoleRepository
        {
            get
            {
                return _roleRepository = _roleRepository ?? new GenericRepository<Role>(dbContext);
            }
        }

        public IGenericRepository<Scope> ScopeRepository
        {
            get
            {
                return _scopeRepository = _scopeRepository ?? new GenericRepository<Scope>(dbContext);
            }
        }
    }
}
