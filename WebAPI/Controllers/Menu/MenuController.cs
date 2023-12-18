using Application.DTOs;
using Application.Features.Shipments.Commands;
using Application;
using Application.Interfaces;
using Domain.Settings;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Application.Features.Menus.Commands;
using WebAPI.Authorization;
using Application.DTOs.SupportDesk;
using Application.Features.SupportDesk;

namespace WebAPI.Controllers.Menu
{
    [Route("menus")]
    //[AuthorizeUser]
    public class MenuController : BaseApiController
    {
        APISettings _settings;
        protected readonly IEncryptDecrypt _encryptDecrypt;

        public MenuController(IOptions<APISettings> settings, IEncryptDecrypt encryptDecrypt)
        {
            _settings = settings.Value;
            _encryptDecrypt = encryptDecrypt;
        }
        [HttpPost("GetMenuForUser")]
        public async Task<IActionResult> GetMenuForUser([FromBody] MenuMasterDTO menuMasterDTO, [FromHeader] string Authorization)
        {

            MenuMasterList response = await mediator.Send(new MenuMasterCommand
            {
                UserId = menuMasterDTO.UserId
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }        
    }
}
