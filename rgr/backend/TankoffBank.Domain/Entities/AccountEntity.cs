using System.ComponentModel.DataAnnotations;

namespace TankoffBank.Domain.Entities
{
    public class AccountEntity
    {
        [Key]
        public Guid Id { get; set; }
        
        public virtual ClientEntity Client { get; set; } = null!;
        
        public virtual TariffEntity Tariff { get; set; } = null!;

        public DateTime CreatedAt { get; set; }
        
        public DateTime DueTo { get; set; }
    }
}

