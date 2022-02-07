using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using UserService.Services.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionString");
builder.Services.AddDbContext<DatabaseContext>(x => x.UseNpgsql(connectionString));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, c =>
//     {
//         c.Authority = $"https://{builder.Configuration["Auth0:Domain"]}";
//         c.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
//         {
//             ValidAudience = builder.Configuration["Auth0:Audience"],
//             ValidIssuer = $"{builder.Configuration["Auth0:Domain"]}"
//         };
//     });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
