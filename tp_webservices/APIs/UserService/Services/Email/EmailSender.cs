using CommonLibrary.Entities.ViewModel;
using UserService.Services.RabbitMQ;

namespace UserService.Services.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly IRabbitMQSender _rabbitMqSender;

        public EmailSender(IRabbitMQSender rabbitMqSender)
        {
            _rabbitMqSender = rabbitMqSender;
        }

        /// <summary>
        /// TODO: replace body and subject with EmailTemplateKey
        /// </summary>
        /// <param name="emailTo"></param>
        /// <param name="passwordRecoveryLink"></param>
        /// <returns></returns>
        public async Task<bool> SendRecoverPasswordEmail(string emailTo, string passwordRecoveryLink)
        {
            EmailVM emailData = new EmailVM();
            emailData.To = new List<string> { emailTo };
            emailData.Body = "Please access the following url to reset your password, you only have 15 minutes to reset your password:<br/><a target='_blank' rel='noopener noreferrer' href='" + passwordRecoveryLink + "'>" + passwordRecoveryLink + "</a>";
            emailData.Subject = "Reset your password";
            emailData.EmailTemplateKey = "";

            return await _rabbitMqSender.PublishEmailMessage(emailData);
        }

        /// <summary>
        /// TODO: replace body and subject with EmailTemplateKey
        /// </summary>
        /// <param name="emailTo"></param>
        /// <param name="activateUserLink"></param>
        /// <returns></returns>
        public async Task<bool> SendActivateUserEmail(string emailTo, string activateUserLink)
        {
            EmailVM emailData = new EmailVM();
            emailData.To = new List<string> { emailTo };
            emailData.Body = "Please access the following url to confirm your email, you only have 24 hours to do so:<br/><a target='_blank' rel='noopener noreferrer' href='" + activateUserLink + "'>" + activateUserLink + "</a>";
            emailData.Subject = "Confirm your email";
            emailData.EmailTemplateKey = "";

            return await _rabbitMqSender.PublishEmailMessage(emailData);
        }

        /// <summary>
        /// TODO: replace body and subject with EmailTemplateKey
        /// </summary>
        /// <param name="emailTo"></param>
        /// <param name="activateAssociationLink"></param>
        /// <returns></returns>
        public async Task<bool> SendActivateAssociationEmail(string emailTo, string activateAssociationLink)
        {
            EmailVM emailData = new EmailVM();
            emailData.To = new List<string> { emailTo };
            emailData.Body = "Please access the following url to confirm your email, you only have 24 hours to do so:<br/><a target='_blank' rel='noopener noreferrer' href='" + activateAssociationLink + "'>" + activateAssociationLink + "</a>";
            emailData.Subject = "Confirm your email";
            emailData.EmailTemplateKey = "";

            return await _rabbitMqSender.PublishEmailMessage(emailData);
        }

        /// <summary>
        /// TODO: replace body and subject with EmailTemplateKey
        /// </summary>
        /// <param name="approvedEmails"></param>
        /// <param name="loginEmailLink"></param>
        /// <returns></returns>
        public async Task<bool> SendBulkAssociationActivatedEmail(List<string> approvedEmails, string loginEmailLink)
        {
            bool success = false;
            foreach (string email in approvedEmails)
            {
                EmailVM emailData = new EmailVM();
                emailData.To = new List<string> { email };
                emailData.Body = "Please access the following url to authenticate:<br/><a target='_blank' rel='noopener noreferrer' href='" + loginEmailLink + "'>" + loginEmailLink + "</a>";
                emailData.Subject = "Your account has been activated";
                emailData.EmailTemplateKey = "";

                success = await _rabbitMqSender.PublishEmailMessage(emailData);
            }
            return success;
        }

        /// <summary>
        /// TODO: replace body and subject with EmailTemplateKey
        /// </summary>
        /// <param name="approvedEmails"></param>
        /// <param name="loginEmailLink"></param>
        /// <returns></returns>
        public async Task<bool> SendBulkUserActivatedEmail(List<string> approvedEmails, string loginEmailLink)
        {
            bool success = false;
            foreach (string email in approvedEmails)
            {
                EmailVM emailData = new EmailVM();
                emailData.To = new List<string> { email };
                emailData.Body = "Please access the following url to authenticate:<br/><a target='_blank' rel='noopener noreferrer' href='" + loginEmailLink + "'>" + loginEmailLink + "</a>";
                emailData.Subject = "Your account has been activated";
                emailData.EmailTemplateKey = "";

                success = await _rabbitMqSender.PublishEmailMessage(emailData);
            }
            return success;
        }
    }
}
