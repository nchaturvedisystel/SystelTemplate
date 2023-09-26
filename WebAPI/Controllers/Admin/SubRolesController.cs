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
    public class SubRolesController : BaseApiController
    {
        APISettings _settings;

        public SubRolesController(IOptions<APISettings> settings)
        {
            _settings = settings.Value;
        }

        [HttpPost("SubRolesMapping")]
        public async Task<IActionResult> SubRolesMapping([FromBody] SubRolesDTO subRolesDTO)
        {

            SubRolesList response = new SubRolesList();
            response = await mediator.Send(new SubRolesCommand
            {
                subRolesDTO = subRolesDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
    }
}
