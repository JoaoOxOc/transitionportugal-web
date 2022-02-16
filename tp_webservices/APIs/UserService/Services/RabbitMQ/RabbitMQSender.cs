using CommonLibrary.Entities.ViewModel;
using MassTransit;

namespace UserService.Services.RabbitMQ
{
    public class RabbitMQSender : IRabbitMQSender
    {
        private readonly IConfiguration _configuration;
        private readonly IBus _bus;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="configuration">dependency injection of app configuration container</param>
        /// <param name="bus">dependency injection of MassTransit bus object</param>
        public RabbitMQSender(IConfiguration configuration, IBus bus)
        {
            _configuration = configuration;
            _bus = bus;
        }

        public async Task<bool> PublishEmailMessage(EmailVM emailData)
        {
            bool success = false;
            try
            {
                string rabbitMqHost = _configuration.GetSection("ApplicationSettings:RabbitMQHost").Get<string>();
                string rabbitMqExchange = _configuration.GetSection("ApplicationSettings:RabbitMQExchange").Get<string>();

                Uri uri = new Uri("rabbitmq://" + rabbitMqHost + "/" + rabbitMqExchange);
                var endPoint = await _bus.GetSendEndpoint(uri);
                await endPoint.Send(emailData);
                success = true;
            }
            catch (Exception)
            {
                success = false;
            }
            return success;
        }
    }
}
