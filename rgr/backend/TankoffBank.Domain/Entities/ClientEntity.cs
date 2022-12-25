using System.ComponentModel.DataAnnotations;

namespace TankoffBank.Domain.Entities
{
    public class ClientEntity
    {
        [Key]
        public Guid Id { get; set; }
        
        public string Name { get; set; } = null!;

        public string Surname { get; set; } = null!;

        public string Patronymic { get; set; } = null!;

        public string Passport { get; set; } = null!;

        public string Address { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public virtual ICollection<AccountEntity> Accounts { get; set; } = null!;
    }
}