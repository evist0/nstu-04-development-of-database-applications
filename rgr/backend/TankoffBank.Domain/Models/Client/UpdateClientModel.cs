namespace TankoffBank.Domain.Models.Client;

public class UpdateClientModel
{
    public string? Name { get; set; } = null!;

    public string? Surname { get; set; } = null!;

    public string? Patronymic { get; set; } = null!;

    public string? Passport { get; set; } = null!;

    public string? Address { get; set; } = null!;

    public string? Phone { get; set; } = null!;
}