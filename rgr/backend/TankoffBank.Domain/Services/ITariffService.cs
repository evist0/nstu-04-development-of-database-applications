using TankoffBank.Domain.Models.Tariff;
using TankoffBank.Domain.ViewModels.Tariff;

namespace TankoffBank.Domain.Services
{
    public interface ITariffService
    {
        Task<TariffsViewModel> GetTariffs();
        
        Task<TariffViewModel> GetTariff(Guid tariffId);

        Task CreateTariff(CreateTariffModel model);

        Task UpdateTariff(Guid tariffId, UpdateTariffModel model);

        Task DeleteTariff(Guid tariffId);
    }
}