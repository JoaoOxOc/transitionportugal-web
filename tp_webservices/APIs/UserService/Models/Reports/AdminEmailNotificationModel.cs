namespace UserService.Models.Reports
{
    public class AdminEmailNotificationModel
    {
        /// <summary>
        /// the Id for the REST URI link
        /// </summary>
        public string UriId { get; set; }

        /// <summary>
        /// the REST URI link
        /// </summary>
        public string UriPath { get; set; }

        /// <summary>
        /// the admin email subject
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// the admin email message
        /// </summary>
        public string Message { get; set; }
    }
}
