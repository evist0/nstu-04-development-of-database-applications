using TankoffBank.Domain.ViewModels.Account;

namespace TankoffBank.Domain.ViewModels.Client;

public class ClientViewModel
{
    public Guid Id { get; set; }
    
    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Patronymic { get; set; } = null!;

    public string Passport { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public virtual List<AccountToClientViewModel> Accounts { get; set; } = null!;
}