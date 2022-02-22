using CommonLibrary.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UserService.Entities;
using UserService.Migrations.Config;
using UserService.Services.UserManager;
using Npgsql;

namespace UserService.Services.Database
{
    public class DatabaseContext : IdentityDbContext<User>
    {

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // get the configuration from the app settings
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            // define the database to use
            try
            {
                var connStringBuilder = new NpgsqlConnectionStringBuilder();
                int dbPort = 0;
                int.TryParse(config["DatabaseSettings:DbPort"], out dbPort);
                bool dbPooling = false;
                bool.TryParse(config["DatabaseSettings:DbPooling"], out dbPooling);
                bool dbTrustCrt = false;
                bool.TryParse(config["DatabaseSettings:DbTrustCertificate"], out dbTrustCrt);
                connStringBuilder.Host = config["DatabaseSettings:DbHost"];
                connStringBuilder.Port = dbPort;
                connStringBuilder.SslMode = config["DatabaseSettings:DbSslMode"] == "None" ? SslMode.Disable : SslMode.Require;
                connStringBuilder.Username = config["DatabaseSettings:DbUser"];
                connStringBuilder.Password = config["DatabaseSettings:DbPassword"];
                connStringBuilder.Database = config["DatabaseSettings:Database"];
                connStringBuilder.TrustServerCertificate = dbTrustCrt;
                connStringBuilder.Pooling = dbPooling;
                connStringBuilder.ServerCompatibilityMode = config["DatabaseSettings:DbServerCompatibilityMode"] == "Redshift" ? ServerCompatibilityMode.Redshift : ServerCompatibilityMode.None;
                optionsBuilder.UseNpgsql(connStringBuilder.ConnectionString, options => options.EnableRetryOnFailure(3));
                throw new Exception(connStringBuilder.ConnectionString);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + "|connstring: " + config.GetConnectionString("DefaultConnectionString"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            new DbSeeder(modelBuilder).Seed();
        }

        public DbSet<User> User { get; set; }
        public DbSet<Association> Association { get; set; }
        public DbSet<Scope> Scope { get; set; }
        public DbSet<RoleScope> RoleScope { get; set; }
        public DbSet<Setting> Setting { get; set; }
        public DbSet<ClientCredential> ClientCredential { get; set; }
    }
}
