using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TankoffBank.Domain;
using TankoffBank.Domain.Services;
using TankoffBank.Infrastructure;

namespace TankoffBank.Services.Extensions
{
    public static class TankoffBankServicesExtensions
    {
        public static IServiceCollection AddTankoffBankServices(this IServiceCollection services)
        {
            services.AddScoped<IApplicationContext, ApplicationDbContext>();
            services.AddScoped<IClientService, ClientService>();
            services.AddScoped<ITariffService, TariffService>();

            return services;
        }

        public static IServiceCollection ConfigureTankoffBankServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            return services;
        }
    }
}