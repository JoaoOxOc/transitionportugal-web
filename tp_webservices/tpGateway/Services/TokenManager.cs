using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;

namespace tpGateway.Services
{
    public class TokenManager : ITokenManager
    {
        private readonly IConfiguration _configuration;
        public TokenManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool ValidateClient(string clientId, string clientToken)
        {
            //TODO: remote check for client app credentials
            if (!string.IsNullOrEmpty(clientToken))
            {
                using RSA rsa = RSA.Create();
                rsa.ImportRSAPublicKey(Convert.FromBase64String(_configuration["JWT:SecretPublicKey"]), out _);
                SecurityToken validatedToken;

                var validationParameters = new TokenValidationParameters()
                {
                    ValidateAudience = false,
                    ValidateIssuer = true,
                    ValidateLifetime = false,
                    IssuerSigningKey = new RsaSecurityKey(rsa),
                    ValidIssuer = _configuration["JWT:ValidIssuer"],
                    CryptoProviderFactory = new CryptoProviderFactory()
                    {
                        CacheSignatureProviders = false
                    }
                };
                new JwtSecurityTokenHandler().ValidateToken(clientToken, validationParameters, out validatedToken);
                if (validatedToken != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
}
