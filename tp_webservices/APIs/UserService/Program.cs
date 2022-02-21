using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;
using UserService.Entities;
using UserService.Services;
using UserService.Services.RabbitMQ;
using UserService.Services.Database;
using UserService.Services.UserManager;
using UserService.Helpers;
using UserService.Migrations.Config;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionString");
builder.Services.AddDbContext<DatabaseContext>(x => x.UseNpgsql(connectionString));


// For Identity
//builder.Services.AddScoped<IPasswordHasher<User>, CustomPasswordHasher>();

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<DatabaseContext>()
    .AddDefaultTokenProviders();

builder.Services.UpgradePasswordSecurity().UseBcrypt<User>();

using RSA rsa = RSA.Create();
rsa.ImportRSAPublicKey(Convert.FromBase64String(configuration["JWT:SecretPublicKey"]), out _);

// Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
// Adding Jwt Bearer
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero,

        ValidAudience = configuration["JWT:ValidAudience"],
        ValidIssuer = configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new RsaSecurityKey(rsa),
        CryptoProviderFactory = new CryptoProviderFactory()
        {
            CacheSignatureProviders = false
        }
    };
});

// Add services to the container.
builder.Services.TryAddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.TryAddScoped<ITPUserManager, TPUserManager>();
builder.Services.TryAddSingleton<ITokenManager, TokenManager>();
builder.Services.TryAddSingleton<IConfiguration>(configuration);
builder.Services.TryAddSingleton<IRabbitMQSender, RabbitMQSender>();

builder.Services.ConfigureMassTransitRabbitMQ(configuration);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.ConfigureSwagger();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
    context.Database.Migrate();

    var tokenManager = scope.ServiceProvider.GetRequiredService<ITokenManager>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    new DbInitializer(tokenManager, roleManager, userManager).Initialize(context);
}

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "UserService v1"));

app.UseAuthentication();
app.UseAuthorization();

// global error handler
// read: https://jasonwatmore.com/post/2022/01/24/net-6-jwt-authentication-with-refresh-tokens-tutorial-with-example-api
app.UseMiddleware<ErrorHandlerMiddleware>();

app.MapControllers();

app.Run();