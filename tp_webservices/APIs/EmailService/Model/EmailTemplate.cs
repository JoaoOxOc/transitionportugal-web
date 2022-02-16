using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmailService.Models
{
    public class EmailTemplate
    {
        [Key]
        public string Id { get; set; }
        
        public string Key { get; set; }

        public string Description { get; set; }
        
        public string Language { get; set; }
        
        public string Subject { get; set; }
        
        public string Body { get; set; }

        #region MetaData

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        #endregion
    }
}
