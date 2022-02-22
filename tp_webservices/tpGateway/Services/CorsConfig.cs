using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace tpGateway.Services
{
    public static class CorsConfig
    {
        public static IServiceCollection ConfigureCors(this IServiceCollection services, IConfiguration configuration)
        {
            string cors = configuration.GetSection("ApplicationSettings:Cors").Get<string>();
            string[] corsUrl = !string.IsNullOrEmpty(cors) ? cors.Split(',') : null;

            if (corsUrl != null)
            {
                services.AddCors(options =>
                {
                    options.AddPolicy("TpCorsPolicy",
                        builder => builder
                            .WithOrigins(corsUrl) // or AllowAnyOrigin() combined with the next commented line
                                                  //.SetIsOriginAllowed(origin => true) // allow any origin
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials());
                });
            }

            return services;
        }
    }
}
