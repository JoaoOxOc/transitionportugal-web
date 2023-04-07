using CommonLibrary.Entities.ViewModel;
using EmailService.Code;
using EmailService.Enums;
using EmailService.Model;
using EmailService.Repositories;
using EmailService.Sender;
using EmailService.Services.RabbitMQ;
using MassTransit;
using System.Text.Json;

namespace EmailService.Consumers
{
    public class EmailQueueConsumer : IEmailQueueConsumer, IConsumer<EmailVM>
    {
        private readonly IEmailService _emailService;
        private readonly IEmailTemplatesRepository _emailTemplateRepo;
        private readonly ISettingsRepository _settingsRepository;
        private readonly IRabbitMQSender _rabbitSender;

        public EmailQueueConsumer(IEmailService emailService, IEmailTemplatesRepository emailTemplateRepo, ISettingsRepository settingsRepository, IRabbitMQSender rabbitSender)
        {
            _emailService = emailService;
            _emailTemplateRepo = emailTemplateRepo;
            _settingsRepository = settingsRepository;
            _rabbitSender = rabbitSender;
        }

        public async Task Consume(ConsumeContext<EmailVM> context)
        {
            var mailData = EmailTemplateReplacer.ProcessEmailTemplate(_emailTemplateRepo, context.Message);
            if (mailData != null)
            {
                this.SendEmail(mailData);
            }
        }

        public async Task SendEmail(EmailVM mailData)
        {
            List<string> emailTo = mailData.To != null && mailData.To.Count > 0 ? mailData.To : EmailSettingsManager.getAdminEmails(this._settingsRepository);
            bool sent = _emailService.SendMail(emailTo, mailData.Subject, mailData.Body);
            if (!sent)
            {
                CommonLibrary.Entities.ViewModel.ExceptionModel exceptionModel = new CommonLibrary.Entities.ViewModel.ExceptionModel();
                exceptionModel.Message = "Email send error";
                exceptionModel.StackTrace = "EmailQueueConsumer.Consume()";
                exceptionModel.DateLogging = DateTime.UtcNow;
                exceptionModel.AdminRole = "Admin";
                exceptionModel.InnerException = null;
                exceptionModel.InputDataJson = JsonSerializer.Serialize(mailData);

                bool success = await _rabbitSender.PublishExceptionMessage(exceptionModel);
            }
        }
    }
}
