using Application.Interfaces;
using Domain.Settings;
using Infrastructure.Shared.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Shared
{
    public static class ServiceExtensions
    {
        public static void AddSharedInfrastructure(this IServiceCollection services, IConfiguration _config)
        {
            services.Configure<ConnectionSettings>(_config.GetSection("ConnectionStrings"));
            services.Configure<APISettings>(_config.GetSection("Settings"));
            services.Configure<JWTSettings>(_config.GetSection("JWT"));
            services.AddSingleton<IEncryptDecrypt, EncryptDecryptService>();
        }        
    }
}
