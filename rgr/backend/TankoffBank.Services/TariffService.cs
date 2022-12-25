using Microsoft.EntityFrameworkCore;
using TankoffBank.Domain;
using TankoffBank.Domain.Entities;
using TankoffBank.Domain.Models.Tariff;
using TankoffBank.Domain.Services;
using TankoffBank.Domain.ViewModels.Tariff;

namespace TankoffBank.Services
{
    public class TariffService : ITariffService
    {
        private readonly IApplicationContext _context;

        public TariffService(IApplicationContext context)
        {
            _context = context;
        }

        public Task<TariffsViewModel> GetTariffs()
        {
            var tariffs = _context.Tariffs.ToList();

            var viewModels = tariffs.Select(t => new TariffViewModel
            {
                Id = t.Id,
                Name = t.Name,
                Term = t.Term,
                Annual = t.Annual
            }).ToList();

            return Task.FromResult(new TariffsViewModel { Tariffs = viewModels });
        }

        public Task<TariffViewModel> GetTariff(Guid tariffId)
        {
            var tariffEntity = _context.Tariffs.FirstOrDefault(t => t.Id == tariffId);

            if (tariffEntity == null)
                throw new Exception("Tariff not found");

            return Task.FromResult(new TariffViewModel
            {
                Id = tariffEntity.Id,
                Name = tariffEntity.Name,
                Term = tariffEntity.Term,
                Annual = tariffEntity.Annual
            });
        }

        public async Task CreateTariff(CreateTariffModel model)
        {
            var tariff = new TariffEntity
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                Term = model.Term,
                Annual = model.Annual,
            };

            _context.Add(tariff);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateTariff(Guid tariffId, UpdateTariffModel model)
        {
            var tariff = _context.Tariffs.FirstOrDefault(t => t.Id == tariffId);

            if (tariff == null)
                throw new Exception("Tariff not found");

            tariff.Name = model.Name ?? tariff.Name;
            tariff.Term = model.Term ?? tariff.Term;
            tariff.Annual = model.Annual ?? tariff.Annual;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteTariff(Guid tariffId)
        {
            var tariff = _context.Tariffs.FirstOrDefault(c => c.Id == tariffId);

            if (tariff == null)
                throw new Exception("Tariff not found");

            var accountsWithTariff = _context.Accounts.Include(a => a.Tariff).Where(a => a.Tariff.Id == tariffId);

            foreach (var accountWithTariff in accountsWithTariff)
            {
                _context.Remove(accountWithTariff);
            }

            _context.Remove(tariff);

            await _context.SaveChangesAsync();
        }
    }
}