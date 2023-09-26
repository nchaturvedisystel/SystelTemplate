using Application.DTOs.Admin;
using Application.Features.Admin.Commands;
using Application;
using Domain.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using WebAPI.Authorization;
using Application.Features.Users.Commands;

namespace WebAPI.Controllers.Admin
{
    [Route("admin")]
    [AuthorizeUser]
    public class MenuMasterController : BaseApiController
    {
        APISettings _settings;

        public MenuMasterController(IOptions<APISettings> settings)
        {
            _settings = settings.Value;
        }

        [HttpPost("MenuMasterCRUD")]
        public async Task<IActionResult> ManageMenu([FromBody] MenuManageDTO menuManageDTO)
        {

            MenuManageList response = new MenuManageList();
            response = await mediator.Send(new MenuManageCRUDCommand
            {
                menuManageDTO = menuManageDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }


        [HttpPost("AdminDashboardGet")]
        public async Task<IActionResult> AdminDashboardGet([FromBody] int ActionUser)
        {
            AdminDashboardList response = new AdminDashboardList();
            response = await mediator.Send(new AdminDashboardCommand
            {
                ActionUser = ActionUser
            });
            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
    }
}
