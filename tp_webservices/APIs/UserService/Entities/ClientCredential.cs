using System.ComponentModel.DataAnnotations;

namespace UserService.Entities
{
    public class ClientCredential
    {
        [Key]
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string ClientId { get; set; }
        public string Description { get; set; }
        public string ClientSecret { get; set; }
    }
}
