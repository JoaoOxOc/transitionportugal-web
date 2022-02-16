﻿
using EmailService.Code;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace EmailService.Sender
{
    public class EmailServiceImp : IEmailService
    {
        public bool SendMail(string to, string subject, string body)
        {
            List<string> tos = new List<string>();
            tos.Add(to);

            List<string> attachments = new List<string>();

            return SendMail(tos, attachments, subject, body);
        }

        public bool SendMail(List<string> to, string subject, string body)
        {
            List<string> attachments = new List<string>();

            return SendMail(to, attachments, subject, body);
        }

        public bool SendMail(string to, string attachment, string subject, string body)
        {
            List<string> tos = new List<string>();
            tos.Add(to);

            List<string> attachments = new List<string>();
            attachments.Add(attachment);

            return SendMail(tos, attachments, subject, body);
        }

        public bool SendMail(string to, List<string> attachments, string subject, string body)
        {
            List<string> tos = new List<string>();
            tos.Add(to);

            return SendMail(tos, attachments, subject, body);
        }

        public bool SendMail(List<string> to, string attachment, string subject, string body)
        {
            List<string> attachments = new List<string>();
            attachments.Add(attachment);

            return SendMail(to, attachments, subject, body);
        }

        private static bool SendMail(List<string> to, List<string> attachments, string subject, string body)
        {
            try
            {
                    MailMessage mail = new MailMessage();
                    mail.From = new MailAddress(SMTPConfigurations.From);
                    mail.IsBodyHtml = true;
                    
                    foreach (string s in to)
                    {
                        mail.To.Add(s);
                    }

                    SmtpClient client = new SmtpClient();
                    client.Port = SMTPConfigurations.Port;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.Host = SMTPConfigurations.Server;
                    //client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(SMTPConfigurations.Username, SMTPConfigurations.Password);
                    client.EnableSsl = SMTPConfigurations.EnableSSL; 
                    if (client.EnableSsl)
                    {
                        ServicePointManager.ServerCertificateValidationCallback = delegate (object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };
                    }
                   
                    mail.Subject = subject;
                    mail.Body = body;

                    mail.SubjectEncoding = Encoding.GetEncoding("iso-8859-1");
                    mail.BodyEncoding = Encoding.GetEncoding("iso-8859-1");

                    SetAttachments(attachments, ref mail);

                    client.Send(mail);

                    return true;
            }
            catch (SmtpException ex)
            {
                string extraInfo = string.Empty;
                if (to != null && to.Count > 0)
                {
                    extraInfo = string.Join(", ", to);
                }

                var errorLog = ErrorLog.ErrorLogGenerator(ex, null, "EmailService", 0, string.Empty, string.Empty, extraInfo);

                //rabbitMQ.ExchangeChannel.BasicPublish("gdpr", "log.event.create", true, null, bytes);

                if (ex.StatusCode == SmtpStatusCode.MailboxNameNotAllowed || ex.StatusCode == SmtpStatusCode.MailboxUnavailable)
                {
                    // If is an incorrect email delete the event fron the queue
                    return true;
                }
                
                return false;
            }
            catch (Exception ex)
            {
                string extraInfo = string.Empty;
                if (to != null && to.Count > 0)
                {
                    extraInfo = string.Join(", ", to);
                }

                var errorLog = ErrorLog.ErrorLogGenerator(ex, null, "EmailService", 0, string.Empty, string.Empty, extraInfo);

                //rabbitMQ.ExchangeChannel.BasicPublish("gdpr", "log.event.create", true, null, bytes);

                return false;
            }
        }
        
        private static void SetAttachments(List<string> attachments, ref MailMessage mail)
        {
            foreach (string file in attachments)
            {
                Attachment tmp = new Attachment(file);
                mail.Attachments.Add(tmp);
            }
        }
    }
}
