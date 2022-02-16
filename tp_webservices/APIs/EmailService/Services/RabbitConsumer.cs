using EmailService.Consumers;
using GreenPipes;
using MassTransit;

namespace EmailService.Services
{
    public static class RabbitConsumer
    {
        /// <summary>
        /// Injects a rabbit MQ consumer configuration
        /// </summary>
        /// <param name="services">the dependency injection container</param>
        /// <returns></returns>
        public static IServiceCollection ConfigureRabbitConsumer(this IServiceCollection services, IConfiguration configuration)
        {
            string rabbitMqHost = configuration.GetSection("ApplicationSettings:RabbitMQHost").Get<string>();
            string rabbitMqUser = configuration.GetSection("ApplicationSettings:RabbitMQUser").Get<string>();
            string rabbitMqPassword = configuration.GetSection("ApplicationSettings:RabbitMQPassword").Get<string>();
            string rabbitMqExchange = configuration.GetSection("ApplicationSettings:RabbitMQExchange").Get<string>();
            string rabbitMqEmailQueue = configuration.GetSection("ApplicationSettings:RabbitMQEmailQueue").Get<string>();
            services.AddMassTransit(x =>
            {
                x.AddConsumer<EmailQueueConsumer>();
                x.AddBus(provider => Bus.Factory.CreateUsingRabbitMq(cfg =>
                {
                    cfg.Host(new Uri("rabbitmq://" + rabbitMqHost), h =>
                    {
                        h.Username(rabbitMqUser);
                        h.Password(rabbitMqPassword);
                    });
                    cfg.ReceiveEndpoint(rabbitMqEmailQueue, ep =>
                    {
                        ep.PrefetchCount = 16;
                        ep.UseMessageRetry(r => r.Interval(2, 100));
                        ep.ConfigureConsumer<EmailQueueConsumer>(provider);
                    });
                }));
            });
            services.AddMassTransitHostedService();
            return services;
        }
    }
}
