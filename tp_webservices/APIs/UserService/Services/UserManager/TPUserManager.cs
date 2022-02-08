using CommonLibrary.Enums;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using UserService.Entities;
using UserService.Services.Database;

namespace UserService.Services.UserManager
{
    public class TPUserManager : ITPUserManager
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IUnitOfWork _uow;

        public TPUserManager(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IUnitOfWork uow)
        {
            this._roleManager = roleManager;
            this._uow = uow;
            _userManager = userManager;
        }

        public async Task<User> SearchUser(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                user = _uow.UserRepository.Get(null, null, (x => x.UserName == username), "Id", SortDirection.Ascending, "").SingleOrDefault();
            }

            return user;
        }

        public async Task<User> ValidateLoginUser(string username, string password)
        {
            var user = await this.SearchUser(username);
            if (user != null)
            {
                if(await _userManager.CheckPasswordAsync(user, password))
                {
                    return user;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public async Task<List<Claim>> GetUserClaims(User user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            return authClaims;
        }

        public async Task<List<Claim>> GetUserScopes(User user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            List<IdentityRole> userIdentityRoles = _uow.IdentityRoleRepository.Get(null, null, (x => userRoles.Contains(x.Name)), "Id", SortDirection.Ascending, "");
            var userRoleScopes = _uow.RoleScopeRepository.Get(null, null, (x => userIdentityRoles.Select(x => x.Id).ToList().Contains(x.RoleId)), "Id", SortDirection.Ascending, "");
            var userScopes = _uow.ScopeRepository.Get(null, null, (x => userRoleScopes.Select(x => x.ScopeId).ToList().Contains(x.Id)), "Id", SortDirection.Ascending, "");

            var authClaims = new List<Claim>();
            authClaims.Add(new Claim("scope", userScopes.Select(x=>x.ScopeName).Aggregate((a,b)=> a + "," + b )));

            return authClaims;
        }

        public async Task<IdentityResult> CreateUser(User user, string password)
        {
            var creationResult = await _userManager.CreateAsync(user, password);

            return creationResult;
        }

        public async Task<IdentityResult> UpdateUser(User user)
        {
            var creationResult = await _userManager.UpdateAsync(user);

            return creationResult;
        }

        public async Task<IdentityResult> AddUserToRole(User user, string role)
        {
            var creationResult = new IdentityResult();
            if (await _roleManager.RoleExistsAsync(role))
            {
                creationResult = await _userManager.AddToRoleAsync(user, role);
            }
            return creationResult;
        }

        public async Task<IdentityResult> CreateRole(User user, string role)
        {
            var creationResult = new IdentityResult();
            if (!await _roleManager.RoleExistsAsync("Admin"))
            {
                creationResult = await _roleManager.CreateAsync(new IdentityRole("Admin"));
            }
            return creationResult;
        }

        public async Task<List<User>> GetUsers()
        {
            var users = new List<User>();

            users = _uow.UserRepository.Get(null, null, null, "UserName", SortDirection.Ascending);

            return users;
        }
    }
}
