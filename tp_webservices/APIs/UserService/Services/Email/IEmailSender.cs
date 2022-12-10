using UserService.Entities;
using UserService.Models.Reports;

namespace UserService.Services.Email
{
    public interface IEmailSender
    {
        Task<bool> SendRecoverPasswordEmail(string emailTo, string language, User userData, string passwordRecoveryLink);

        Task<bool> SendActivateUserEmail(string emailTo, string language, User userData, string activateUserLink);

        Task<bool> SendActivateAssociationEmail(string emailTo, string language, Association associationData, string activateAssociationLink);

        Task<bool> SendBulkAssociationActivatedEmail(List<string> approvedEmails, string language, List<Association> associationsData, string loginEmailLink);

        Task<bool> SendBulkUserActivatedEmail(List<string> approvedEmails, string language, List<User> usersData, string loginEmailLink);

        Task<bool> SendAdminNotificationEmail(AdminEmailNotificationModel emailNotificationData);
    }
}
