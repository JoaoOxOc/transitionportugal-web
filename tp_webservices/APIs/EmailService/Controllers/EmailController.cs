using CommonLibrary.Entities.ViewModel;
using CommonLibrary.Enums;
using CommonLibrary.Extensions;
using EmailService.Code;
using EmailService.Repositories;
using EmailService.Sender;
using EmailService.Services.RabbitMQ;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
using System.Xml.Linq;

namespace EmailService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IEmailTemplatesRepository _emailTemplateRepo;
        private readonly ISettingsRepository _settingsRepository;
        private readonly IRabbitMQSender _rabbitSender;
        public EmailController(IEmailService emailService, IEmailTemplatesRepository emailTemplateRepo, ISettingsRepository settingsRepository, IRabbitMQSender rabbitSender)
        {
            _emailService = emailService;
            _emailTemplateRepo = emailTemplateRepo;
            _settingsRepository = settingsRepository;
            _rabbitSender = rabbitSender;
        }

        [HttpPost]
        [Route("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailVM model)
        {
            model.EmailLanguage = String.IsNullOrEmpty(model.EmailLanguage) ? "pt-PT" : model.EmailLanguage;
            model.EmailTemplateKey = String.IsNullOrEmpty(model.EmailTemplateKey) ? EmailTemplatesEnum.WebContactNotification.ToString() : model.EmailTemplateKey;
            if (model.TokensToReplace_Body == null || model.TokensToReplace_Body.Count == 0)
            {
                model.TokensToReplace_Body = new List<Tuple<string, string>>
                {
                    // TODO: replace utilizador for the real name of the user
                    new Tuple<string, string>("{{messageRecipientName}}", model.To == null || model.To.Count == 0 ? "Administrador" : "Utilizador"),
                    new Tuple<string, string>("{{emailFrom}}", string.IsNullOrEmpty(model.From) ? string.Empty : model.From),
                    new Tuple<string, string>("{{contactName}}", string.IsNullOrEmpty(model.FromName) ? string.Empty : model.FromName),
                    new Tuple<string, string>("{{contactSubject}}", string.IsNullOrEmpty(model.Subject) ? string.Empty : model.Subject),
                    new Tuple<string, string>("{{contactMessage}}", string.IsNullOrEmpty(model.Body) ? string.Empty : model.Body)
                };

            }
            var mailData = EmailTemplateReplacer.ProcessEmailTemplate(_emailTemplateRepo, model);
            List<string> emailTo = mailData.To != null && mailData.To.Count > 0 ? mailData.To : EmailSettingsManager.getAdminEmails(this._settingsRepository);
            bool sent = _emailService.SendMail(emailTo, mailData.Subject, mailData.Body);
            if (!sent)
            {
                CommonLibrary.Entities.ViewModel.ExceptionModel exceptionModel = new CommonLibrary.Entities.ViewModel.ExceptionModel();
                exceptionModel.Message = "Email send error";
                exceptionModel.StackTrace = "EmailController.SendEmail()";
                exceptionModel.DateLogging = DateTime.UtcNow;
                exceptionModel.AdminRole = "Admin";
                exceptionModel.InnerException = null;
                exceptionModel.InputDataJson = JsonSerializer.Serialize(mailData);

                bool success = await _rabbitSender.PublishExceptionMessage(exceptionModel);
                return StatusCode(StatusCodes.Status500InternalServerError, null);
            }
            else
            {
                return Ok(new
                {
                    sent = sent
                });
            }
        }
    }
}
