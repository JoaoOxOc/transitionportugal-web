using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using UserService.Models;

namespace UserService.Services.UserManager
{
    public interface ITokenManager
    {
        JwtResponse GetToken(List<Claim> authClaims, int? expireTimeMinutes);
        JwtResponse GetClientToken();
        KeyValuePair<string, int> GenerateRefreshToken(string userId);
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token);
    }
}
