using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using UserService.Models;

namespace UserService.Services.UserManager
{
    public class TokenManager : ITokenManager
    {

        private readonly IConfiguration _configuration;

        public TokenManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public JwtResponse GetToken(List<Claim> authClaims)
        {
            var privateKey = Convert.FromBase64String(_configuration["JWT:SecretPrivateKey"]);

            using RSA rsa = RSA.Create();
            rsa.ImportRSAPrivateKey(privateKey, out _);

            var signingCredentials = new SigningCredentials(new RsaSecurityKey(rsa), SecurityAlgorithms.RsaSha256)
            {
                CryptoProviderFactory = new CryptoProviderFactory { CacheSignatureProviders = false }
            };

            //var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            _ = int.TryParse(_configuration["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(tokenValidityInMinutes),
                claims: authClaims,
                signingCredentials: signingCredentials//new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return new JwtResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpiresAt = new DateTimeOffset(DateTime.Now.AddMinutes(tokenValidityInMinutes)).ToUnixTimeSeconds(),
            };
        }

        public JwtResponse GetClientToken()
        {
            var privateKey = Convert.FromBase64String(_configuration["JWT:SecretPrivateKey"]);

            using RSA rsa = RSA.Create();
            rsa.ImportRSAPrivateKey(privateKey, out _);

            var signingCredentials = new SigningCredentials(new RsaSecurityKey(rsa), SecurityAlgorithms.RsaSha256)
            {
                CryptoProviderFactory = new CryptoProviderFactory { CacheSignatureProviders = false }
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                claims: new List<Claim>() { new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) }, 
                signingCredentials: signingCredentials
                );

            return new JwtResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }

        /// <summary>
        /// read: https://github.com/cornflourblue/dotnet-6-jwt-refresh-tokens-api/blob/master/Controllers/UsersController.cs
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public KeyValuePair<string,int> GenerateRefreshToken(string userId)
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);

            _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

            var privateKey = Convert.FromBase64String(_configuration["JWT:SecretPrivateKey"]);

            using RSA rsa = RSA.Create();
            rsa.ImportRSAPrivateKey(privateKey, out _);

            var signingCredentials = new SigningCredentials(new RsaSecurityKey(rsa), SecurityAlgorithms.RsaSha256)
            {
                CryptoProviderFactory = new CryptoProviderFactory { CacheSignatureProviders = false }
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: new List<Claim>() { new Claim("userId", userId) },
                expires: DateTime.Now.AddDays(refreshTokenValidityInDays),
                signingCredentials: signingCredentials
                );

            //return new JwtResponse
            //{
            //    Token = new JwtSecurityTokenHandler().WriteToken(token),
            //    ExpiresAt = refreshTokenValidityInDays,
            //};

            return new KeyValuePair<string, int>(Convert.ToBase64String(randomNumber), refreshTokenValidityInDays);
        }

        public ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            using RSA rsa = RSA.Create();
            rsa.ImportRSAPublicKey(Convert.FromBase64String(_configuration["JWT:SecretPublicKey"]), out _);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                //IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])),
                IssuerSigningKey = new RsaSecurityKey(rsa),
                CryptoProviderFactory = new CryptoProviderFactory()
                {
                    CacheSignatureProviders = false
                },
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.RsaSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;

        }
    }
}
