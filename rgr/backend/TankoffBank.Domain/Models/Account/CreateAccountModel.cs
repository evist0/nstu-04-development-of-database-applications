namespace TankoffBank.Domain.Models.Account;

public class CreateAccountModel
{
    public Guid ClientId { get; set; }
    
    public Guid TariffId { get; set; }
}