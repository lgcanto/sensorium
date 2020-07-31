using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Sensorium.Data
{
    public static class CheckDbContext
    {
        public static IHost CheckDatabase(this IHost host)
        {
            var serviceScopeFactory = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));

            using (var scope = serviceScopeFactory.CreateScope())
            {
                var services = scope.ServiceProvider;
                var dbContext = services.GetRequiredService<PostgreDbContext>();

                while(true)
                {
                    try {
                        if(dbContext.Database.CanConnect())
                        {
                            break;
                        }
                    }
                    catch {
                        Console.WriteLine("Could not connect to database, retrying...");
                    }
                }
            }

            return host;
        }
    }
}