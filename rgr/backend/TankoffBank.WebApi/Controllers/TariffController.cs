using Microsoft.AspNetCore.Mvc;
using TankoffBank.Domain.Models.Tariff;
using TankoffBank.Domain.Services;
using TankoffBank.Domain.ViewModels.Tariff;

namespace TankoffBank.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class TariffController : Controller
    {
        private readonly ITariffService _tariffService;

        public TariffController(ITariffService tariffService)
        {
            _tariffService = tariffService;
        }

        [HttpGet]
        public Task<TariffsViewModel> GetTariffs()
        {
            return _tariffService.GetTariffs();
        }

        [HttpGet("{id}")]
        public Task<TariffViewModel> GetTariff(string id)
        {
            var guid = Guid.Parse(id);

            return _tariffService.GetTariff(guid);
        }

        [HttpPost]
        public async Task<OkResult> CreateTariff(CreateTariffModel model)
        {
            await _tariffService.CreateTariff(model);

            return Ok();
        }

        [HttpPatch("{id}")]
        public async Task<OkResult> UpdateTariff(string id, UpdateTariffModel model)
        {
            var guid = Guid.Parse(id);

            await _tariffService.UpdateTariff(guid, model);

            return Ok();
        }
        
        [HttpDelete("{id}")]
        public async Task<OkResult> DeleteTariff(string id)
        {
            var guid = Guid.Parse(id);

            await _tariffService.DeleteTariff(guid);

            return Ok();
        }
    }
}