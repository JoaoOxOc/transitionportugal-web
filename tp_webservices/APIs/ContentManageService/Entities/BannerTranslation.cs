using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace ContentManageService.Entities
{
    /// <summary>
    /// This entity contains the actual banner data, corresponding to different languages
    /// </summary>
    public class BannerTranslation
    {
        /// <summary>
        /// The ID should be the language identifier, like en-us
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Required]
        [MaxLength(5)]
        public string LangKey { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Required]
        [MaxLength(25)]
        public string PageKey { get; set; }

        /// <summary>
        /// Store banner data as a json structure
        /// </summary>
        [Column(TypeName = "jsonb")]
        public JsonDocument? BannerDataJson { get; set; }

        /// <summary>
        /// Store banner data as an HTML structure
        /// </summary>
        public string? BannerDataHtml { get; set; }

        [ForeignKey("Banner")]
        public int? BannerId { get; set; }
        public virtual Banner Banner { get; set; }
    }
}
