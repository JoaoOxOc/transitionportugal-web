using ContentManageService.Services.Database;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Npgsql;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var connStringBuilder = new NpgsqlConnectionStringBuilder();
int dbPort = 0;
int.TryParse(builder.Configuration["DatabaseSettings:DbPort"], out dbPort);
bool dbPooling = false;
bool.TryParse(builder.Configuration["DatabaseSettings:DbPooling"], out dbPooling);
bool dbTrustCrt = false;
bool.TryParse(builder.Configuration["DatabaseSettings:DbTrustCertificate"], out dbTrustCrt);
connStringBuilder.Host = builder.Configuration["DatabaseSettings:DbHost"];
connStringBuilder.Port = dbPort;
connStringBuilder.SslMode = builder.Configuration["DatabaseSettings:DbSslMode"] == "None" ? SslMode.Disable : SslMode.Require;
connStringBuilder.Username = builder.Configuration["DatabaseSettings:DbUser"];
connStringBuilder.Password = builder.Configuration["DatabaseSettings:DbPassword"];
connStringBuilder.Database = builder.Configuration["DatabaseSettings:Database"];
connStringBuilder.TrustServerCertificate = dbTrustCrt;
connStringBuilder.Pooling = dbPooling;
connStringBuilder.ServerCompatibilityMode = builder.Configuration["DatabaseSettings:DbServerCompatibilityMode"] == "Redshift" ? ServerCompatibilityMode.Redshift : ServerCompatibilityMode.None;
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionString");
builder.Services.AddDbContext<DatabaseContext>(x => x.UseNpgsql(connStringBuilder.ConnectionString));

// Add services to the container.
builder.Services.TryAddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
