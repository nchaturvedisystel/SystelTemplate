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
    public class UserGroupController : BaseApiController
    {
        APISettings _settings;

        public UserGroupController(IOptions<APISettings> settings)
        {
            _settings = settings.Value;
        }

        [HttpPost("UserGroupCRUD")]
        public async Task<IActionResult> ManageUserGroup([FromBody] UserGroupDTO userGroupDTO)
        {

            UserGroupList response = new UserGroupList();
            response = await mediator.Send(new UserGroupCRUDCommand
            {
                userGroupDTO = userGroupDTO
            }) ;

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
    }
}
