using Application.DTOs.SupportDesk;
using Application.Features.SupportDesk;
using Application;
using Application.Interfaces;
using Domain.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace WebAPI.Controllers.SupportDesk
{
    [Route("Ticket")]
    public class TicketActivityController : BaseApiController
    {
        APISettings _settings;
        protected readonly IEncryptDecrypt _encryptDecrypt;

        public TicketActivityController(IOptions<APISettings> settings, IEncryptDecrypt encryptDecrypt)
        {
            _settings = settings.Value;
            _encryptDecrypt = encryptDecrypt;
        }

        [HttpPost("TicketComments")]
        public async Task<IActionResult> TicketDescription([FromBody] TicketActivityDTO ticketActivityDTO)
        {
            TicketActivityList response = new TicketActivityList();


            response = await mediator.Send(new TicketActivityCommand
            {
                ticketActivityDTO = ticketActivityDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
    }
}
