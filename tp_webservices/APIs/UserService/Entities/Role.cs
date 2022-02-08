using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace UserService.Entities
{
    public class Role
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }

        public string RoleName { get; set; }


        [JsonIgnore]
        public List<UserRole> UserRoles { get; set; }

        [JsonIgnore]
        public List<RoleScope> RoleScopes { get; set; }
    }
}
