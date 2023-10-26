using Application;
using Application.DTOs.Admin;
using Application.DTOs.SupportDesk;
using Application.Features.Admin.Commands;
using Application.Interfaces;
using Domain.Settings;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace WebAPI.Controllers.Admin
{
    [Route("company")]
    public class CompanyMasterController : BaseApiController
    {
        APISettings _settings;
        protected readonly IEncryptDecrypt _encryptDecrypt;

        public CompanyMasterController(IOptions<APISettings> settings, IEncryptDecrypt encryptDecrypt)
        {
            _settings = settings.Value;
            _encryptDecrypt = encryptDecrypt;
        }

        [HttpPost("GetCompanyList")]
        public async Task<IActionResult> GetCompanyList([FromBody] CompanyMasterDTO companyMasterDTO)
        {
            CompanyList response = new CompanyList();
            response = await mediator.Send(new GetCompanyCommand
            {
                companyMasterDTO = companyMasterDTO
            });
            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
    }
}
