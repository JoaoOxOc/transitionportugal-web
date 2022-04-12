using System.ComponentModel.DataAnnotations;

namespace ContentManageService.Entities
{
    /// <summary>
    /// This entity only stores the non-translatable data of the banner
    /// For translatable data, use BannerTranslation
    /// </summary>
    public class Banner
    {
        [Key]
        public int? Id { get; set; }

        /// <summary>
        /// The identifier of the page where the banner record belongs
        /// </summary>
        [Required]
        [MaxLength(25)]
        public string PageKey { get; set; }

        public bool? IsDraft { get; set;}

        #region MetaData

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string? CreatedBy { get; set; }

        public string? UpdatedBy { get; set; }

        #endregion

    }
}
