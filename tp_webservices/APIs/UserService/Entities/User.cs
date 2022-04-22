namespace UserService.Entities
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.Json.Serialization;

    public class User: IdentityUser
    {
        public string Name { get; set; }

        [ForeignKey("Association")]
        public int? AssociationId { get; set; }
        public virtual Association? Association { get; set; }

        public bool IsVerified { get; set; }

        public bool IsActive { get; set; }
        public bool? IsEmailVerified { get; set; }

        public string? RefreshToken { get; set; }

        public bool TermsConsent { get; set; }

        public decimal TermsConsentVersion { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }

        #region Metadata

        public string? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }

        #endregion
    }
}
