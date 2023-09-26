using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using Traveller.UI.Pages;

namespace Traveller.UI.Pages
{
    public class LoginModel : PageModel
    {
        private readonly ILogger<LoginModel> _logger;
        //AppSettings _settings;

        public LoginModel(ILogger<LoginModel> logger, IOptions<AppSettings> settings)
        {
            _logger = logger;
            //_settings = settings.Value;
            //SessionObj.AppVersion = _settings.AppVersion;
        }
        public void OnGet()
        {
        }
    }
}
