namespace TankoffBank.Domain.ViewModels.Tariff;

public class TariffViewModel
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public int Term { get; set; }

    public float Annual { get; set; }
}