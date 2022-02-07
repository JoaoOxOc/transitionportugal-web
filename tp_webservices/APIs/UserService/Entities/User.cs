namespace UserService.Entities
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.Json.Serialization;

    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }

        [ForeignKey("AssociationId")]
        public virtual Association Association { get; set; }

        public bool IsVerified { get; set; }

        public bool IsActive { get; set; }

        public int? LoginAttempts { get; set; }

        [JsonIgnore]
        public string PasswordHash { get; set; }

        [JsonIgnore]
        public List<RefreshToken> RefreshTokens { get; set; }

        [JsonIgnore]
        public List<Role> UserRoles { get; set; }

        #region Metadata

        public int? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }

        #endregion
    }
}
