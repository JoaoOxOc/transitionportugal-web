namespace UserService.Entities
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.Json.Serialization;

    public class User: IdentityUser
    {
        public int? AssociationId { get; set; }
        public virtual Association? Association { get; set; }

        public bool IsVerified { get; set; }

        public bool IsActive { get; set; }
        public bool? IsEmailVerified { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }

        #region Metadata

        public int? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }

        #endregion
    }
}
