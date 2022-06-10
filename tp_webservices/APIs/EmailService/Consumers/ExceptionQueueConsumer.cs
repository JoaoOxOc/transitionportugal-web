using CommonLibrary.Entities.ViewModel;
using EmailService.Code;
using EmailService.Repositories;
using EmailService.Sender;
using MassTransit;

namespace EmailService.Consumers
{
    public class ExceptionQueueConsumer : IExceptionQueueConsumer, IConsumer<CommonLibrary.Entities.ViewModel.ExceptionModel>
    {
        private readonly IEmailService _emailService;
        private readonly IEmailTemplatesRepository _emailTemplateRepo;

        public ExceptionQueueConsumer(IEmailService emailService, IEmailTemplatesRepository emailTemplateRepo)
        {
            _emailService = emailService;
            _emailTemplateRepo = emailTemplateRepo;
        }
        public async Task Consume(ConsumeContext<ExceptionModel> context)
        {
            //var mailData = EmailTemplateReplacer.ProcessEmailTemplate(_emailTemplateRepo, context.Message);
            //bool sent = _emailService.SendMail(mailData.To, mailData.Subject, mailData.Body);
            // TODO: deal with message not sent
        }
    }
}
