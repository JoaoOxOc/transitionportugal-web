using System.ComponentModel.DataAnnotations;

namespace UserService.Entities
{
    public class Association
    {
        [Key]
        public int? Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string Town { get; set; }

        public string PostalCode { get; set; }

        public string Vat { get; set; }

        public string LogoImage { get; set; }

        public string Filename { get; set; }

        public string? Description { get; set; }

        public string? Website { get; set; }

        public string? Tags { get; set; }

        public DateTime? ContractStartDate { get; set; }

        public DateTime? ContractEndDate { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsVerified { get; set; }
        public bool? IsEmailVerified { get; set; }

        #region MetaData

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<User> Users { get; set; }

        #endregion
    }
}
