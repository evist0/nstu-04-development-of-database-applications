using Microsoft.EntityFrameworkCore;
using TankoffBank.Domain;
using TankoffBank.Domain.Entities;
using TankoffBank.Domain.Models.Client;
using TankoffBank.Domain.Services;
using TankoffBank.Domain.ViewModels.Account;
using TankoffBank.Domain.ViewModels.Client;
using TankoffBank.Domain.ViewModels.Tariff;

namespace TankoffBank.Services
{
    public class ClientService : IClientService
    {
        private readonly IApplicationContext _context;

        public ClientService(IApplicationContext context)
        {
            _context = context;
        }

        public Task<ClientsViewModel> GetClients()
        {
            var clients = _context.Clients
                .ToList();

            var viewModels = clients.Select(c => new ClientWithoutAccountsViewModel
            {
                Id = c.Id,
                Name = c.Name,
                Surname = c.Surname,
                Patronymic = c.Patronymic,
                Passport = c.Passport,
                Phone = c.Phone,
                Address = c.Address,
            }).ToList();

            return Task.FromResult(new ClientsViewModel { Clients = viewModels });
        }

        public Task<ClientViewModel> GetClient(Guid clientId)
        {
            var client = _context.Clients
                .Include(c => c.Accounts)
                .ThenInclude(a => a.Tariff)
                .FirstOrDefault(c => c.Id == clientId);

            if (client == null)
                throw new Exception("Client not found");

            return Task.FromResult(new ClientViewModel
            {
                Id = client.Id,
                Name = client.Name,
                Surname = client.Surname,
                Patronymic = client.Patronymic,
                Passport = client.Passport,
                Phone = client.Phone,
                Address = client.Address,
                Accounts = client.Accounts.Select(a => new AccountToClientViewModel
                {
                    Tariff = new TariffViewModel { Name = a.Tariff.Name, Id = a.Tariff.Id, Annual = a.Tariff.Annual },
                    Id = a.Id,
                    CreatedAt = a.CreatedAt,
                    DueTo = a.DueTo
                }).ToList(),
            });
        }

        public async Task CreateClient(CreateClientModel model)
        {
            var client = new ClientEntity
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                Surname = model.Surname,
                Patronymic = model.Patronymic,
                Passport = model.Passport,
                Phone = model.Phone,
                Address = model.Address
            };

            _context.Add(client);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateClient(Guid clientId, UpdateClientModel model)
        {
            var client = _context.Clients.FirstOrDefault(c => c.Id == clientId);

            if (client == null)
                throw new Exception("Client not found");

            client.Name = model.Name ?? client.Name;
            client.Surname = model.Surname ?? client.Surname;
            client.Patronymic = model.Patronymic ?? client.Patronymic;
            client.Passport = model.Passport ?? client.Passport;
            client.Phone = model.Phone ?? client.Phone;
            client.Address = model.Address ?? client.Address;

            await _context.SaveChangesAsync();
        }

        public async Task CreateAccount(Guid clientId, Guid tariffId)
        {
            var tariff = _context.Tariffs.FirstOrDefault(t => t.Id == tariffId);

            if (tariff == null)
                throw new Exception("Tariff not found");

            var client = _context.Clients.FirstOrDefault(c => c.Id == clientId);

            if (client == null)
                throw new Exception("Client not found");

            var now = DateTime.Now;

            var account = new AccountEntity
            {
                Id = Guid.NewGuid(),
                Client = client,
                Tariff = tariff,
                CreatedAt = now,
                DueTo = now.AddMonths(tariff.Term)
            };

            _context.Add(account);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAccount(Guid accountId)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.Id == accountId);

            if (account == null)
                throw new Exception("Account not found");

            _context.Remove(account);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteClient(Guid clientId)
        {
            var client = _context.Clients.FirstOrDefault(c => c.Id == clientId);

            if (client == null)
                throw new Exception("Client not found");

            _context.Remove(client);

            await _context.SaveChangesAsync();
        }
    }
}