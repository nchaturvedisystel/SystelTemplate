using Application;
using Domain.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using WebAPI.Authorization;
using Application.Interfaces.Admin;
using Application.DTOs.Admin;
using Application.Features.Admin.Commands;

namespace WebAPI.Controllers.Admin
{
    [Route("admin")]
    [AuthorizeUser]
    public class RolesController : BaseApiController
    {
        APISettings _settings;

        public RolesController(IOptions<APISettings> settings)
        {
            _settings = settings.Value;
        }

        [HttpPost("RolesCRUD")]
        public async Task<IActionResult> ManageRoles([FromBody] RolesDTO rolesDTO)
        {

            RolesList response = new RolesList();
            response = await mediator.Send(new RolesCRUDCommand
            {
                rolesDTO = rolesDTO
            }) ;

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
    }
}
