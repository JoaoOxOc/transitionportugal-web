namespace UserService.Services.Email
{
    public interface IEmailSender
    {
        Task<bool> SendRecoverPasswordEmail(string emailTo, string language, string passwordRecoveryLink);

        Task<bool> SendActivateUserEmail(string emailTo, string language, string activateUserLink);

        Task<bool> SendActivateAssociationEmail(string emailTo, string language, string activateAssociationLink);

        Task<bool> SendBulkAssociationActivatedEmail(List<string> approvedEmails, string language, string loginEmailLink);

        Task<bool> SendBulkUserActivatedEmail(List<string> approvedEmails, string language, string loginEmailLink);
    }
}
