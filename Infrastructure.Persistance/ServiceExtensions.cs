using Application.Interfaces;
using Infrastructure.Persistance.Services.User;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class ServiceExtensions
    {
        public static void AddInfrastructureLayer(this IServiceCollection services)
        {
            services.AddScoped<IUserContract, UserService>();
        }
    }
}
