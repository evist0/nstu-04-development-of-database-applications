using TankoffBank.Domain.Models.Client;
using TankoffBank.Domain.ViewModels.Client;

namespace TankoffBank.Domain.Services
{
    public interface IClientService
    {
        Task<ClientsViewModel> GetClients();

        Task<ClientViewModel> GetClient(Guid clientId);

        Task CreateClient(CreateClientModel model);

        Task UpdateClient(Guid clientId, UpdateClientModel model);

        Task CreateAccount(Guid clientId, Guid tariffId);
        
        Task DeleteAccount(Guid accountId);

        Task DeleteClient(Guid clientId);
    }
}