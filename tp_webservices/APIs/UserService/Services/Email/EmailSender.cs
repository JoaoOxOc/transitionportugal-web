using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Enums;
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
        public async Task<bool> SendRecoverPasswordEmail(string emailTo, string language, string passwordRecoveryLink)
        {
            EmailVM emailData = new EmailVM();
            emailData.To = new List<string> { emailTo };
            emailData.EmailLanguage = language;
            emailData.EmailTemplateKey = EmailTemplatesEnum.UserAccountPasswordRecovery.ToString();
            emailData.TokensToReplace_Body = new List<Tuple<string, string>> { new Tuple<string, string>("{{passwordRecoveryLink}}", passwordRecoveryLink) };
            emailData.TokensToReplace_Subject = new List<Tuple<string, string>>();

            return await _rabbitMqSender.PublishEmailMessage(emailData);
        }

        /// <summary>
        /// TODO: replace body and subject with EmailTemplateKey
        /// </summary>
        /// <param name="emailTo"></param>
        /// <param name="activateUserLink"></param>
        /// <returns></returns>
        public async Task<bool> SendActivateUserEmail(string emailTo, string language, string activateUserLink)
        {
            EmailVM emailData = new EmailVM();
            emailData.To = new List<string> { emailTo };
            emailData.EmailTemplateKey = EmailTemplatesEnum.NewUserAccountEmailVerification.ToString();
            emailData.TokensToReplace_Body = new List<Tuple<string, string>> { new Tuple<string, string>("{{activateUserLink}}", activateUserLink) };
            emailData.TokensToReplace_Subject = new List<Tuple<string, string>>();
            emailData.EmailLanguage = language;

            return await _rabbitMqSender.PublishEmailMessage(emailData);
        }

        /// <summary>
        /// TODO: replace body and subject with EmailTemplateKey
        /// </summary>
        /// <param name="emailTo"></param>
        /// <param name="activateAssociationLink"></param>
        /// <returns></returns>
        public async Task<bool> SendActivateAssociationEmail(string emailTo, string language, string activateAssociationLink)
        {
            EmailVM emailData = new EmailVM();
            emailData.To = new List<string> { emailTo };
            emailData.EmailTemplateKey = EmailTemplatesEnum.NewAssociationEmailVerification.ToString();
            emailData.TokensToReplace_Body = new List<Tuple<string, string>> { new Tuple<string, string>("{{activateAssociationLink}}", activateAssociationLink) };
            emailData.TokensToReplace_Subject = new List<Tuple<string, string>>();
            emailData.EmailLanguage = language;

            return await _rabbitMqSender.PublishEmailMessage(emailData);
        }

        /// <summary>
        /// TODO: replace body and subject with EmailTemplateKey
        /// </summary>
        /// <param name="approvedEmails"></param>
        /// <param name="loginEmailLink"></param>
        /// <returns></returns>
        public async Task<bool> SendBulkAssociationActivatedEmail(List<string> approvedEmails, string language, string loginEmailLink)
        {
            bool success = false;
            foreach (string email in approvedEmails)
            {
                EmailVM emailData = new EmailVM();
                emailData.To = new List<string> { email };
                emailData.EmailTemplateKey = EmailTemplatesEnum.NewAssociationVerified.ToString();
                emailData.TokensToReplace_Body = new List<Tuple<string, string>> { new Tuple<string, string>("{{loginLink}}", loginEmailLink) };
                emailData.TokensToReplace_Subject = new List<Tuple<string, string>>();
                emailData.EmailLanguage = language;

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
        public async Task<bool> SendBulkUserActivatedEmail(List<string> approvedEmails, string language, string loginEmailLink)
        {
            bool success = false;
            foreach (string email in approvedEmails)
            {
                EmailVM emailData = new EmailVM();
                emailData.To = new List<string> { email };
                emailData.EmailTemplateKey = EmailTemplatesEnum.NewUserAccountVerified.ToString();
                emailData.TokensToReplace_Body = new List<Tuple<string, string>> { new Tuple<string, string>("{{loginLink}}", loginEmailLink) };
                emailData.TokensToReplace_Subject = new List<Tuple<string, string>>();
                emailData.EmailLanguage = language;

                success = await _rabbitMqSender.PublishEmailMessage(emailData);
            }
            return success;
        }
    }
}
