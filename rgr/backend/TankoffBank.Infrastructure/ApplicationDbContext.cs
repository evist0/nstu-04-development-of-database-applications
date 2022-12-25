using Microsoft.EntityFrameworkCore;
using TankoffBank.Domain;
using TankoffBank.Domain.Entities;

namespace TankoffBank.Infrastructure
{
    public sealed class ApplicationDbContext : DbContext,
        IApplicationContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            Clients = Set<ClientEntity>();
            Tariffs = Set<TariffEntity>();
            Accounts = Set<AccountEntity>();
        }

        public IQueryable<ClientEntity> Clients { get; }

        public IQueryable<TariffEntity> Tariffs { get; }

        public IQueryable<AccountEntity> Accounts { get; }

        public new void Add<T>(T entity) where T : notnull
        {
            base.Add(entity);
        }

        public new void Remove<T>(T entity) where T : notnull
        {
            base.Remove(entity);
        }

        public Task SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AccountEntity>().HasOne(a => a.Client).WithMany(c => c.Accounts).IsRequired();
            builder.Entity<AccountEntity>().HasOne(a => a.Tariff).WithMany().IsRequired();

            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            base.OnConfiguring(builder);
        }
    }
}