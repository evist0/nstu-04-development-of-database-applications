using TankoffBank.Domain.ViewModels.Tariff;

namespace TankoffBank.Domain.ViewModels.Account;

public class AccountToClientViewModel
{
    public Guid Id { get; set; }

    public virtual TariffViewModel Tariff { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime DueTo { get; set; }
}