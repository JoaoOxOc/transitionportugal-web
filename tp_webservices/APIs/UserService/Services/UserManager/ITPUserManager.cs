using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using UserService.Entities;
using UserService.Models;

namespace UserService.Services.UserManager
{
    public interface ITPUserManager
    {
        Task<User> SearchUser(string username);
        Task<User> SearchUserById(string userId);
        Task<User> ValidateLoginUser(string username, string password);
        Task<List<Claim>> GetUserClaims(User user);
        Task<List<Claim>> GetUserClaimsPasswordRecovery(User user);
        Task<IdentityResult> CreateUser(User user, string password);
        Task<IdentityResult> UpdateUser(User user);
        Task<IdentityResult> AddUserToRole(User user, string role);
        Task<IdentityResult> CreateRole(User user, string role);
        Task<List<Claim>> GetUserScopes(User user);
        Task<List<User>> GetUsers();
        Task<ProfileModel> GetUserProfileById(string userId);
    }
}
