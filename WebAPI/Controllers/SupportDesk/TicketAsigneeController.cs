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
    [Route("TicketAsignee")]
    public class TicketAsigneeController : BaseApiController
    {
        APISettings _settings;
        protected readonly IEncryptDecrypt _encryptDecrypt;

        public TicketAsigneeController(IOptions<APISettings> settings, IEncryptDecrypt encryptDecrypt)
        {
            _settings = settings.Value;
            _encryptDecrypt = encryptDecrypt;
        }
        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] TicketAsigneeDTO ticketAsigneeDTO)
        {
            TicketAsigneeList response = new TicketAsigneeList();


            response = await mediator.Send(new TicketAsignee_InsertCommand
            {
                TicketAsigneeDTO = ticketAsigneeDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromBody] TicketAsigneeDTO ticketAsigneeDTO)
        {
            TicketAsigneeList response = new TicketAsigneeList();


            response = await mediator.Send(new TicketAsignee_DeleteCommand
            {
                TicketAsigneeDTO = ticketAsigneeDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromBody] TicketAsigneeDTO ticketAsigneeDTO)
        {
            TicketAsigneeList response = new TicketAsigneeList();


            response = await mediator.Send(new TicketAsignee_UpdateCommand
            {
                TicketAsigneeDTO = ticketAsigneeDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
        [HttpPost("UpdateStatus")]
        public async Task<IActionResult> UpdateStatus([FromBody] TicketAsigneeDTO ticketAsigneeDTO)
        {
            TicketAsigneeList response = new TicketAsigneeList();


            response = await mediator.Send(new TicketAsignee_UpdateStatusCommand
            {
                TicketAsigneeDTO = ticketAsigneeDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
        [HttpPost("GetAllByTicketId")]
        public async Task<IActionResult> GetAllByTicketId([FromBody] TicketAsigneeDTO ticketAsigneeDTO)
        {
            TicketAsigneeList response = new TicketAsigneeList();


            response = await mediator.Send(new TicketAsignee_GetAllByTicketIdCommand
            {
                TicketAsigneeDTO = ticketAsigneeDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
    }

}
