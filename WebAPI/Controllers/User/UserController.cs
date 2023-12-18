using Application;
using Application.DTOs;
using Application.Features.Shipments.Commands;
using Domain.Settings;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Infrastructure.Persistance.Services;
using Application.Features.Users.Commands;
using Application.DTOs.User;
using WebAPI.Authorization;
using Application.DTOs.Admin;
using Application.Features.Admin.Commands;
using Application.DTOs.Common;

namespace WebAPI.Controllers
{
    [Route("users")]
    public class UserController : BaseApiController
    {

        APISettings _settings;
        protected readonly IEncryptDecrypt _encryptDecrypt;
        private ILogger<UserController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public UserController(IOptions<APISettings> settings, IEncryptDecrypt encryptDecrypt, IWebHostEnvironment webHostEnvironment, ILogger<UserController> logger)
        {
            _logger = logger;
            _settings = settings.Value;
            _encryptDecrypt = encryptDecrypt;
            _webHostEnvironment = webHostEnvironment;

            SessionObj.WebRootPath = _webHostEnvironment.ContentRootPath;
        }

        [HttpPost("auth")]
        public async Task<IActionResult> Auth([FromBody] DTO.UserLoginDTO userDTO, [FromServices] IJwtToken jwtToken)
        {
            _logger.LogInformation($" Application Web root Path : {_webHostEnvironment.WebRootPath}");
            SessionObj.WebRootPath = _webHostEnvironment.ContentRootPath;
            userDTO.Password = _encryptDecrypt.EncryptValue(userDTO.Password);

            UserDTO response = await mediator.Send(new AuthenticateUserCommand
            {
                CompanyCode = userDTO.CompanyCode,
                UserName = userDTO.UserName,
                Password = userDTO.Password
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            string token = string.Empty;
            string profileImage = string.Empty;
            if (response.UserId > 0)
            {
                UserSessionDTO userSessionDTO = new UserSessionDTO
                {
                    ID = response.UserId,
                    UserName = response.FirstName + " " + response.LastName,
                    Designation = response.Designation,
                    EmailId = response.EmailId,
                    MobileNo = response.MobileNo,
                    RoleId = response.RoleId,
                    CompanyId = response.CompanyId,
                    DefaultCompanyId = response.DefaultCompanyId,
                };

                token = jwtToken.CreateUserToken(userSessionDTO);
            }

            var result = new
            {
                token,
                profileImage,
                userId = response.UserId,
                userNameIntial = response.FirstName + " " + response.LastName,
                designation = (response.UserId > 0) ? response.Designation : response.ResponseDescription,
                emailId = response.EmailId,
                mobileNo = response.MobileNo,
                roleId = response.RoleId,
                companyId = response.CompanyId,
                defaultCompanyId = response.DefaultCompanyId,
            };

            return Ok(APIResponse<dynamic>.OK(result));
        }
        [HttpGet("ValidateToken")]
        public async Task<IActionResult> ValidateToken([FromHeader] string Authorization, [FromServices] IJwtToken jwtToken)
        {
            string token = Authorization;
            UserSessionDTO userSessionDTO = jwtToken.ValidateToken(token);
            if (userSessionDTO == null)
            {
                return BadRequest("Token Expired");
            }
            else
            {
                string ProfileImagePath = Utilities.GetUserProfileImage(_settings, _webHostEnvironment.ContentRootPath, userSessionDTO.ID.ToString());

                var result = new
                {
                    token,
                    userId = userSessionDTO.ID,
                    profileImage = ProfileImagePath,
                    userName = userSessionDTO.UserName,
                    designation = userSessionDTO.Designation,
                    emailId = userSessionDTO.EmailId,
                    mobileNo = userSessionDTO.MobileNo,
                    roleId = userSessionDTO.RoleId,
                    companyId = userSessionDTO.CompanyId,
                    defaultCompanyId = userSessionDTO.DefaultCompanyId,
                };

                return Ok(result);
            }
        }
        [HttpPost("UserMasterCrud")]
        [AuthorizeUser]
        public async Task<IActionResult> GetUser([FromBody] UserMasterDTO userMasterDTO)
        {
            userMasterDTO.WebRootPath = SessionObj.WebRootPath;
            UserList response = new UserList();
            response = await mediator.Send(new UserCRUDCommand
            {
                userMasterDTO = userMasterDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }

        [HttpPost("GenerateUserCredentials")]
        [AuthorizeUser]
        public async Task<IActionResult> GenerateUserCredentials([FromBody] UserCredDTO userCredDTO)
        {
            UserList response = new UserList();
            userCredDTO.UserPassword = _encryptDecrypt.EncryptValue(userCredDTO.UserPassword);
            response = await mediator.Send(new UserLoginCRUDCommand
            {
                UserCredDTO = userCredDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }

        [HttpPost("UserWorkCenterCRUD")]
        public async Task<IActionResult> UserWorkCenterCRUD([FromBody] UserWorkCenterDTO userWorkCenterDTO)
        {
            UserWorkCenterList response = new UserWorkCenterList();
            response = await mediator.Send(new UserWorkCenterCRUDCommand
            {
                userWorkCenterDTO = userWorkCenterDTO
            });
            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }

        [HttpPost("UserRoleCRUD")]
        public async Task<IActionResult> UserRole([FromBody] UserRoleDTO userRoleDTO)
        {
            UserRoleList response = new UserRoleList();
            response = await mediator.Send(new UserRoleCRUDCommand
            {
                userRoleDTO = userRoleDTO
            });
            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }

        [HttpPost("UserDashboardGet")]
        public async Task<IActionResult> UserDashboardGet([FromBody] UserDashboardDTO userDashboardDTO)
        {
            UserDashboardList response = new UserDashboardList();
            response = await mediator.Send(new UserDashboardCommand
            {
                userDashboardDTO = userDashboardDTO
            });
            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }

        [HttpPost("UserStatusUpdate")]
        public async Task<IActionResult> UserStatusUpdate([FromBody] UserMasterDTO userMasterDTO)
        {
            UserMasterDTO response = new UserMasterDTO();
            response = await mediator.Send(new UserStatusUpdateCommand
            {
                userMasterDTO = userMasterDTO
            });
            return Ok(response);
        }

        [HttpGet("GetAllUserList")]
        public async Task<IActionResult> GetAllUserList()
        {
            DropDownList response = await mediator.Send(new GetAllUserListCommand { });
            return Ok(response);
        }

        //[HttpGet("GetCompanyList")]
        //public async Task<IActionResult> GetCompanyList()
        //{
        //    CompanyList response = await mediator.Send(new GetCompanyCommand{ } );
        //    return Ok(response);
        //}



    }
}
