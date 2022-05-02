using MailChimp.Net.Models;

namespace UserService.Services.Mailchimp
{
    public interface IMailchimpRepository
    {
        List<Template> GetAllTemplates();
        List<List> GetAllMailingLists();
        Content GetTemplateDefaultContent(string templateId);
        Content CreateAndSendCampaign(string html, int templateId, string listId, string replyToEmail, string fromName, string emailTitle, string emailSubject);
    }
}
