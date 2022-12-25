using Microsoft.AspNetCore.Mvc;
using TankoffBank.Domain.Models.Account;
using TankoffBank.Domain.Models.Client;
using TankoffBank.Domain.Services;
using TankoffBank.Domain.ViewModels.Client;

namespace TankoffBank.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class ClientController : Controller
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public Task<ClientsViewModel> GetClients()
        {
            return _clientService.GetClients();
        }

        [HttpGet("{id}")]
        public Task<ClientViewModel> GetClient(string id)
        {
            var guid = Guid.Parse(id);

            return _clientService.GetClient(guid);
        }

        [HttpPost]
        public async Task<OkResult> CreateClient(CreateClientModel model)
        {
            await _clientService.CreateClient(model);

            return Ok();
        }

        [HttpPatch("{id}")]
        public async Task<OkResult> UpdateClient(string id, UpdateClientModel model)
        {
            var guid = Guid.Parse(id);

            await _clientService.UpdateClient(guid, model);

            return Ok();
        }

        [HttpPost("account")]
        public async Task<OkResult> CreateAccount(CreateAccountModel model)
        {
            await _clientService.CreateAccount(model.ClientId, model.TariffId);

            return Ok();
        }

        [HttpDelete("account")]
        public async Task<OkResult> DeleteAccount(DeleteAccountModel model)
        {
            await _clientService.DeleteAccount(model.AccountId);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<OkResult> DeleteClient(string id)
        {
            var guid = Guid.Parse(id);

            await _clientService.DeleteClient(guid);

            return Ok();
        }
    }
}