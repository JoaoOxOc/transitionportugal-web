using Microsoft.EntityFrameworkCore;
using UserService.Entities;

namespace UserService.Services.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // get the configuration from the app settings
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            // define the database to use
            optionsBuilder.UseNpgsql(config.GetConnectionString("DefaultConnectionString"));
        }

        public DbSet<User> User { get; set; }
        public DbSet<RefreshToken> RefreshToken { get; set; }
        public DbSet<Association> Association { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Scope> Scope { get; set; }
    }
}
