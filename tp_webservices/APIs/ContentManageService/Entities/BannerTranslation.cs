using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        /// <summary>
        /// Store banner data as a json structure
        /// </summary>
        [Column(TypeName = "jsonb")]
        public string? BannerDataJson { get; set; }

        /// <summary>
        /// Store banner data as an HTML structure
        /// </summary>
        public string? BannerDataHtml { get; set; }

        [ForeignKey("Banner")]
        public int? BannerId { get; set; }
        public virtual Banner Banner { get; set; }
    }
}
