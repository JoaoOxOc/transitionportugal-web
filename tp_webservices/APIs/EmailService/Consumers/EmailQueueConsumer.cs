using CommonLibrary.Entities.ViewModel;
using EmailService.Code;
using EmailService.Repositories;
using EmailService.Sender;
using MassTransit;

namespace EmailService.Consumers
{
    public class EmailQueueConsumer : IEmailQueueConsumer, IConsumer<EmailVM>
    {
        private readonly IEmailService _emailService;
        private readonly IEmailTemplatesRepository _emailTemplateRepo;

        public EmailQueueConsumer(IEmailService emailService, IEmailTemplatesRepository emailTemplateRepo)
        {
            _emailService = emailService;
            _emailTemplateRepo = emailTemplateRepo;
        }

        public async Task Consume(ConsumeContext<EmailVM> context)
        {
            // TODO: deal with email template and email send

            var mailData = EmailTemplateReplacer.ProcessEmailTemplate(_emailTemplateRepo, context.Message);
            _emailService.SendMail(mailData.To, mailData.Subject, mailData.Body);
        }
    }
}
