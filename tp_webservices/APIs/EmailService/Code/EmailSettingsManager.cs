using EmailService.Enums;
using EmailService.Model;
using EmailService.Repositories;

namespace EmailService.Code
{
    public class EmailSettingsManager
    {
        public static List<string> getAdminEmails(ISettingsRepository settingsRepository)
        {
            List<string> adminEmails = new List<string>();
            Setting adminEmailSetting = settingsRepository.GetFiltered(SettingCode.Administration_Email.ToString(), null, null, string.Empty, string.Empty).FirstOrDefault();

            if (adminEmailSetting != null)
            {
                adminEmails.Add(adminEmailSetting.Value);
            }
            return adminEmails;
        }
    }
}
