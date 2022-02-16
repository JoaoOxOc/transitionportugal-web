using CommonLibrary.Entities.ViewModel;
using EmailService.Sender;
using MassTransit;

namespace EmailService.Consumers
{
    public class EmailQueueConsumer : IEmailQueueConsumer, IConsumer<EmailVM>
    {
        private readonly IEmailService _emailService;

        public EmailQueueConsumer(IEmailService emailService)
        {
            _emailService = emailService;
        }

        public async Task Consume(ConsumeContext<EmailVM> context)
        {
            // TODO: deal with email template and email send
        }
    }
}
