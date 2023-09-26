using Application.DTOs.Admin;
using Application.Features.Admin.Commands;
using Application;
using Domain.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using WebAPI.Authorization;

namespace WebAPI.Controllers.Admin
{
    [Route("admin")]
    [AuthorizeUser]
    public class WorkCenterMasterController : BaseApiController
    {
        APISettings _settings;

        public WorkCenterMasterController(IOptions<APISettings> settings)
        {
            _settings = settings.Value;
        }

        [HttpPost("WorkCenterMasterCRUD")]
        public async Task<IActionResult> ManageWorkCenter([FromBody] WorkCenterDTO workCenterDTO)
        {
            WorkCenterList response = new WorkCenterList();

            response = await mediator.Send(new WorkCenterCRUDCommand
            {
                workCenterDTO = workCenterDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
    }
}
