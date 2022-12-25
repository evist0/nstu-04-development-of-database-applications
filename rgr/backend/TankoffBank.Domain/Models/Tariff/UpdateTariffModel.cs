namespace TankoffBank.Domain.Models.Tariff;

public class UpdateTariffModel
{
    public string? Name { get; set; } = null!;

    public int? Term { get; set; }

    public float? Annual { get; set; }
}