using Application.DTOs.SupportDesk;
using Application.Features.SupportDesk;
using Application.Interfaces;
using Application;
using Domain.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Application.Features.Menus.Commands;

namespace WebAPI.Controllers.SupportDesk
{
    [Route("Ticket")]
    public class DashboardController : BaseApiController
    {
        APISettings _settings;
        protected readonly IEncryptDecrypt _encryptDecrypt;

        public DashboardController(IOptions<APISettings> settings, IEncryptDecrypt encryptDecrypt)
        {
            _settings = settings.Value;
            _encryptDecrypt = encryptDecrypt;
        }

        [HttpPost("GetAdminDashboardData")]
        public async Task<IActionResult> GetAdminDashboardData([FromBody] InputParams inputParams )
        {
            DashboardDTO response = new DashboardDTO();


            response = await mediator.Send(new AdminDashboardCommand
            {
                InputParams = inputParams
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
        [HttpPost("GetClientWorkList")]
        public async Task<IActionResult> GetClientWorkList([FromBody] SupportTicketDTO supportTicketDTO)
        {
            ClientWorkList response = new ClientWorkList();


            response = await mediator.Send(new ClientWorkListCommand
            {
                supportTicketDTO = supportTicketDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
    }
}
