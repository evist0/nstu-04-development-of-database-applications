using TankoffBank.Domain.Entities;

namespace TankoffBank.Domain
{
    public interface IApplicationContext
    {
        IQueryable<ClientEntity> Clients { get; }

        IQueryable<TariffEntity> Tariffs { get; }

        IQueryable<AccountEntity> Accounts { get; }
        
        void Add<T>(T entity) where T : notnull;

        void Remove<T>(T entity) where T : notnull;

        Task SaveChangesAsync();
    }
}