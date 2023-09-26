using Application;
using Application.Interfaces;
using Domain.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Application.DTOs.Common;
using Application.Features.Common.Commands;
using System;

namespace WebAPI.Controllers.Common
{
    [Route("common")]
    public class CommonController : BaseApiController
    {
        APISettings _settings;
        public CommonController(IOptions<APISettings> settings)
        {
            _settings = settings.Value;
        }

        [HttpPost("UserTimeTrack")]
        public async Task<IActionResult> UserTimeTrack([FromBody] UserTimeTrackingDTO userTimeTrackingDTO)
        {

            var response = await mediator.Send(new UserTimeTrackingCommand
            {
                userTimeTrackingDTO = userTimeTrackingDTO
           });


            return Ok(response);
        }

        [HttpPost("DashboardGet")]
        public async Task<IActionResult> DashboardGet([FromBody] int ActionUser)
        {
            DashboardList response = new DashboardList();

            response = await mediator.Send(new DashboardCommand
            {
                ActionUser = ActionUser
           });
            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
    }
}
