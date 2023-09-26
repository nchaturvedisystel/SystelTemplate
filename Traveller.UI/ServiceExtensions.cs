using Traveller.UI.Pages;

namespace Traveller.UI
{
    public static class ServiceExtensions
    {
        public static void AddSharedInfrastructure(this IServiceCollection services, IConfiguration _config)
        {
            services.Configure<AppSettings>(_config.GetSection("Settings"));

            //For Prod
            //SessionObj.AppVersion = _config.GetSection("Settings")["AppVersion"].ToString();

            //For Dev
            SessionObj.AppVersion = DateTime.Now.Ticks.ToString();
        }

    }
}
