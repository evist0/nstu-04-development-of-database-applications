using System.ComponentModel.DataAnnotations;

namespace TankoffBank.Domain.Entities
{
    public class TariffEntity
    {
        [Key] public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public int Term { get; set; }

        public float Annual { get; set; }
    }
}