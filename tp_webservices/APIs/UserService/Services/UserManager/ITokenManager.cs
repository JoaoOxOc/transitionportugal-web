using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using UserService.Models;

namespace UserService.Services.UserManager
{
    public interface ITokenManager
    {
        JwtResponse GetToken(List<Claim> authClaims);
        KeyValuePair<string, int> GenerateRefreshToken();
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token);
    }
}
