using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace UserService.Entities
{
    public class TermsConditions
    {
        [Key]
        public int? Id { get; set; }

        [Required]
        public decimal Version { get; set; }

        public bool IsActive { get; set; }

        /// <summary>
        /// Store banner data as a json structure
        /// </summary>
        [Column(TypeName = "jsonb")]
        public JsonDocument? DataBlocksJson { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string? UpdatedBy { get; set; }

        public string? CreatedBy { get; set; }
    }
}
