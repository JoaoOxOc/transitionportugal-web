using CommonLibrary.Enums;
using EmailService.Enums;
using EmailService.Model;
using EmailService.Repositories;
using MongoDB.Bson;

namespace EmailService.Services
{
    public class DbInitializer
    {
        public static void Initialize(IServiceProvider services)
        {
            var settingsRepository = services.GetRequiredService<ISettingsRepository>();
            var emailTemplatesRepository = services.GetRequiredService<IEmailTemplatesRepository>();

            var allSettings = settingsRepository.Get().Result;

            if (allSettings.Count() == 0)
                SeedSettings(settingsRepository);

            SeedEmailTemplates(emailTemplatesRepository);
        }

        public static void SeedSettings(ISettingsRepository settingsRepository)
        {
            List<Setting> settings = new List<Setting>();

            settings.Add(new Setting() { Key = SettingCode.SMTP_Server.ToString(), SettingType = (int)SettingsType.EMAIL, Value = "smtp-mail.outlook.com", DefaultValue = "smtp-mail.outlook.com", Description = "Servidor SMTP", CreatedBy = null, UpdatedBy = null });
            settings.Add(new Setting() { Key = SettingCode.SMTP_Port.ToString(), SettingType = (int)SettingsType.EMAIL, Value = "587", DefaultValue = "587", Description = "Porta do servidor SMTP", CreatedBy = null, UpdatedBy = null });
            settings.Add(new Setting() { Key = SettingCode.SMTP_Username.ToString(), SettingType = (int)SettingsType.EMAIL, Value = "test@hotmail.com", DefaultValue = "test@hotmail.com", Description = "Username SMTP", CreatedBy = null, UpdatedBy = null });
            settings.Add(new Setting() { Key = SettingCode.SMTP_Password.ToString(), SettingType = (int)SettingsType.EMAIL, Value = "test", DefaultValue = "test", Description = "Password SMTP", CreatedBy = null, UpdatedBy = null });
            settings.Add(new Setting() { Key = SettingCode.SMTP_From.ToString(), SettingType = (int)SettingsType.EMAIL, Value = "test@hotmail.com", DefaultValue = "test@hotmail.com", Description = "Endereço de envio SMTP", CreatedBy = null, UpdatedBy = null });
            settings.Add(new Setting() { Key = SettingCode.SMTP_SSL.ToString(), SettingType = (int)SettingsType.EMAIL, Value = "true", DefaultValue = "true", Description = "Required SSL", CreatedBy = null, UpdatedBy = null });

            foreach (var setting in settings)
            {
                settingsRepository.Add(setting);
            }
        }

        public static void SeedEmailTemplates(IEmailTemplatesRepository templatesRepository)
        {
            List<EmailTemplate> emailTemplates = new List<EmailTemplate>();

            EmailTemplate newAccountPT = new EmailTemplate();
            newAccountPT.Key = EmailTemplatesEnum.NewUserAccountEmailVerification.ToString();
            newAccountPT.Description = "Português - Validação do email da Conta de Utilizador";
            newAccountPT.Language = "pt-PT";
            newAccountPT.Subject = "Transição Portugal - verificação de email";
            newAccountPT.BodyHtml = "Please access the following url to confirm your email, you only have 24 hours to do so:<br/><a target='_blank' rel='noopener noreferrer' href='{{activateUserLink}}'>{{activateUserLink}}</a>";
            newAccountPT.CreatedAt = DateTime.UtcNow;
            newAccountPT.CreatedBy = null;
            newAccountPT.UpdatedBy = null;
            emailTemplates.Add(newAccountPT);

            EmailTemplate newAccountEN = new EmailTemplate();
            newAccountEN.Key = EmailTemplatesEnum.NewUserAccountEmailVerification.ToString();
            newAccountEN.Description = "Inglês - Validação do email da Conta de Utilizador";
            newAccountEN.Language = "en-US";
            newAccountEN.Subject = "Transition Portugal - email validation";
            newAccountEN.BodyHtml = "Please access the following url to confirm your email, you only have 24 hours to do so:<br/><a target='_blank' rel='noopener noreferrer' href='{{activateUserLink}}'>{{activateUserLink}}</a>";
            newAccountEN.CreatedAt = DateTime.UtcNow;
            newAccountEN.CreatedBy = null;
            newAccountEN.UpdatedBy = null;
            emailTemplates.Add(newAccountEN);

            EmailTemplate newAccountCompanyPT = new EmailTemplate();
            newAccountCompanyPT.Key = EmailTemplatesEnum.NewAssociationEmailVerification.ToString();
            newAccountCompanyPT.Description = "Português - Validação do email da Associação";
            newAccountCompanyPT.Language = "pt-PT";
            newAccountCompanyPT.Subject = "Transição Portugal - verificação de email";
            newAccountCompanyPT.BodyHtml = "Please access the following url to confirm your email, you only have 24 hours to do so:<br/><a target='_blank' rel='noopener noreferrer' href='{{activateAssociationLink}}'>{{activateAssociationLink}}</a>";
            newAccountCompanyPT.CreatedAt = DateTime.UtcNow;
            newAccountCompanyPT.CreatedBy = null;
            newAccountCompanyPT.UpdatedBy = null;
            emailTemplates.Add(newAccountCompanyPT);

            EmailTemplate newAccountCompanyEN = new EmailTemplate();
            newAccountCompanyEN.Key = EmailTemplatesEnum.NewAssociationEmailVerification.ToString();
            newAccountCompanyEN.Description = "Inglês - Validação do email da Associação";
            newAccountCompanyEN.Language = "en-US";
            newAccountCompanyEN.Subject = "Transition Portugal - email validation";
            newAccountCompanyEN.BodyHtml = "Please access the following url to confirm your email, you only have 24 hours to do so:<br/><a target='_blank' rel='noopener noreferrer' href='{{activateAssociationLink}}'>{{activateAssociationLink}}</a>";
            newAccountCompanyEN.CreatedAt = DateTime.UtcNow;
            newAccountCompanyEN.CreatedBy = null;
            newAccountCompanyEN.UpdatedBy = null;
            emailTemplates.Add(newAccountCompanyEN);

            EmailTemplate newAccountVerifiedPT = new EmailTemplate();
            newAccountVerifiedPT.Key = EmailTemplatesEnum.NewUserAccountVerified.ToString();
            newAccountVerifiedPT.Description = "Português - Aprovação da Conta de Utilizador";
            newAccountVerifiedPT.Language = "pt-PT";
            newAccountVerifiedPT.Subject = "Transição Portugal - utilizador aprovado";
            newAccountVerifiedPT.BodyHtml = "Please access the following url to authenticate:<br/><a target='_blank' rel='noopener noreferrer' href='{{loginLink}}'>{{loginLink}}</a>";
            newAccountVerifiedPT.CreatedAt = DateTime.UtcNow;
            newAccountVerifiedPT.CreatedBy = null;
            newAccountVerifiedPT.UpdatedBy = null;
            emailTemplates.Add(newAccountVerifiedPT);

            EmailTemplate newAccountVerifiedEN = new EmailTemplate();
            newAccountVerifiedEN.Key = EmailTemplatesEnum.NewUserAccountVerified.ToString();
            newAccountVerifiedEN.Description = "Inglês - Aprovação da Conta de Utilizador";
            newAccountVerifiedEN.Language = "en-US";
            newAccountVerifiedEN.Subject = "Transition Portugal - user approved";
            newAccountVerifiedEN.BodyHtml = "Please access the following url to authenticate:<br/><a target='_blank' rel='noopener noreferrer' href='{{loginLink}}'>{{loginLink}}</a>";
            newAccountVerifiedEN.CreatedAt = DateTime.UtcNow;
            newAccountVerifiedEN.CreatedBy = null;
            newAccountVerifiedEN.UpdatedBy = null;
            emailTemplates.Add(newAccountVerifiedEN);

            EmailTemplate newAccountCompanyVerifiedPT = new EmailTemplate();
            newAccountCompanyVerifiedPT.Key = EmailTemplatesEnum.NewAssociationVerified.ToString();
            newAccountCompanyVerifiedPT.Description = "Português - Aprovação da Associação";
            newAccountCompanyVerifiedPT.Language = "pt-PT";
            newAccountCompanyVerifiedPT.Subject = "Transição Portugal - associação aprovada";
            newAccountCompanyVerifiedPT.BodyHtml = "Please access the following url to authenticate:<br/><a target='_blank' rel='noopener noreferrer' href='{{loginLink}}'>{{loginLink}}</a>";
            newAccountCompanyVerifiedPT.CreatedAt = DateTime.UtcNow;
            newAccountCompanyVerifiedPT.CreatedBy = null;
            newAccountCompanyVerifiedPT.UpdatedBy = null;
            emailTemplates.Add(newAccountCompanyVerifiedPT);

            EmailTemplate newAccountCompanyVerifiedEN = new EmailTemplate();
            newAccountCompanyVerifiedEN.Key = EmailTemplatesEnum.NewAssociationVerified.ToString();
            newAccountCompanyVerifiedEN.Description = "Inglês - Validação do email da Associação";
            newAccountCompanyVerifiedEN.Language = "en-US";
            newAccountCompanyVerifiedEN.Subject = "Transition Portugal - association approved";
            newAccountCompanyVerifiedEN.BodyHtml = "Please access the following url to authenticate:<br/><a target='_blank' rel='noopener noreferrer' href='{{loginLink}}'>{{loginLink}}</a>";
            newAccountCompanyVerifiedEN.CreatedAt = DateTime.UtcNow;
            newAccountCompanyVerifiedEN.CreatedBy = null;
            newAccountCompanyVerifiedEN.UpdatedBy = null;
            emailTemplates.Add(newAccountCompanyVerifiedEN);

            EmailTemplate accountPasswordRecoveryPT = new EmailTemplate();
            accountPasswordRecoveryPT.Key = EmailTemplatesEnum.UserAccountPasswordRecovery.ToString();
            accountPasswordRecoveryPT.Description = "Português - recuperação de password da conta";
            accountPasswordRecoveryPT.Language = "pt-PT";
            accountPasswordRecoveryPT.Subject = "Transição Portugal - recuperação de password";
            accountPasswordRecoveryPT.BodyHtml = "Please access the following url to reset your password, you only have 15 minutes to reset your password:<br/><a target='_blank' rel='noopener noreferrer' href='{{passwordRecoveryLink}}'>{{passwordRecoveryLink}}</a>";
            accountPasswordRecoveryPT.CreatedAt = DateTime.UtcNow;
            accountPasswordRecoveryPT.CreatedBy = null;
            accountPasswordRecoveryPT.UpdatedBy = null;
            emailTemplates.Add(accountPasswordRecoveryPT);

            EmailTemplate accountPasswordRecoveryEN = new EmailTemplate();
            accountPasswordRecoveryEN.Key = EmailTemplatesEnum.UserAccountPasswordRecovery.ToString();
            accountPasswordRecoveryEN.Description = "Inglês - recuperação de password da conta";
            accountPasswordRecoveryEN.Language = "en-US";
            accountPasswordRecoveryEN.Subject = "Transition Portugal - password recovery";
            accountPasswordRecoveryEN.BodyHtml = "Please access the following url to reset your password, you only have 15 minutes to reset your password:<br/><a target='_blank' rel='noopener noreferrer' href='{{passwordRecoveryLink}}'>{{passwordRecoveryLink}}</a>";
            accountPasswordRecoveryEN.CreatedAt = DateTime.UtcNow;
            accountPasswordRecoveryEN.CreatedBy = null;
            accountPasswordRecoveryEN.UpdatedBy = null;
            emailTemplates.Add(accountPasswordRecoveryEN);


            foreach (EmailTemplate obj in emailTemplates)
            {
                if (!templatesRepository.GetFiltered(obj.Key, obj.Language, null, null, string.Empty, "asc").Any())
                {
                    templatesRepository.Add(obj);
                }
            }
        }
    }
}
