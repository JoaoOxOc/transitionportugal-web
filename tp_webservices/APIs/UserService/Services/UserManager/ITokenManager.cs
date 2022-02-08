using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace UserService.Services.UserManager
{
    public interface ITokenManager
    {
        JwtSecurityToken GetToken(List<Claim> authClaims);
        KeyValuePair<string, int> GenerateRefreshToken();
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token);
    }
}
