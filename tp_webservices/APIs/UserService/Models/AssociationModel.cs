namespace UserService.Models
{
    public class AssociationModel
    {
        public int? Id { get; set; }

        public string Name { get; set; }

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

        public List<UserReadModel> AssociationUsers { get; set; }
    }
}
