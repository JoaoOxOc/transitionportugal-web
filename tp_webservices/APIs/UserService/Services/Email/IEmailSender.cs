namespace UserService.Services.Email
{
    public interface IEmailSender
    {
        Task<bool> SendRecoverPasswordEmail(string emailTo, string passwordRecoveryLink);

        Task<bool> SendActivateUserEmail(string emailTo, string activateUserLink);

        Task<bool> SendActivateAssociationEmail(string emailTo, string activateAssociationLink);

        Task<bool> SendBulkAssociationActivatedEmail(List<string> approvedEmails, string loginEmailLink);

        Task<bool> SendBulkUserActivatedEmail(List<string> approvedEmails, string loginEmailLink);
    }
}
