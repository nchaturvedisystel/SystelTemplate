using Application.DTOs;
using Application.DTOs.Admin;
using Application.DTOs.Common;
using Application.DTOs.User;
using Application.Interfaces;
using Application.Interfaces.User;
using Dapper;
using Domain.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Data;
using System.Data.SqlClient;
using System.DirectoryServices.Protocols;
using System.IO;
using System.Threading.Tasks;

namespace Infrastructure.Persistance.Services.User
{
    public class UserService : DABase, IUserContract, IUserMaster
    {
        APISettings _settings;
        ConnectionSettings _connectionSettings;
        private const string SP_AuthenticateUser = "ana.ValidateUserLogin";
        private const string SP_UserMaster_CRUD = "ana.UserMaster_CRUD";
        private const string SP_UserLogin_CRUD = "ana.UserLogin_CRUD";
        private const string SP_UserWorkCenter_CRUD = "ana.UserWorkCenter_CRUD";
        private const string SP_UserRole_CRUD = "ana.UserRole_CRUD";
        private const string SP_Dashboard_GetAllUserDetails = "ana.Dashboard_GetAllUserDetails";
        private const string SP_UserMaster_UpdateStatus = "ana.UserMaster_UpdateStatus";
        private const string SP_GetCompanyName = "ana.GetCompanyName";
        private const string SP_UserMaster_LoadAllDDL = "ana.UserMaster_LoadAllDDL";

        private ILogger<UserService> _logger;


        public UserService(IOptions<ConnectionSettings> connectionSettings, ILogger<UserService> logger, IOptions<APISettings> settings) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
            _settings = settings.Value;
            _connectionSettings = connectionSettings.Value;
        }
        public async Task<UserDTO> Authenticate(string companyCode, string userName, string password)
        {
            UserDTO userInfo = null;
            try
            {
                if (_connectionSettings.PrintConnectionString == "Y")
                {
                    _logger.LogInformation($"AppKeyPath :{_connectionSettings.AppKeyPath} ");
                    _logger.LogInformation($"DBCONN :{_connectionSettings.DBCONN} ");
                    _logger.LogInformation($"Connection String :{ConnectionString} ");
                }
                _logger.LogInformation($"Started authenticate user {userName} for client id: {companyCode}");

                using (SqlConnection connection = new SqlConnection(ConnectionString))
                {
                    userInfo = await connection.QuerySingleOrDefaultAsync<UserDTO>(SP_AuthenticateUser, new
                    {
                        UserName = userName,
                        UserPassword = password,
                        CompanyId = companyCode

                    }, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return userInfo;
        }
        public static bool User()
        {
            bool validation;
            try
            {
                validation = true;
            }
            catch (LdapException)
            {
                validation = false;
            }
            return validation;
        }

        public async Task<UserList> UserCRUD(UserMasterDTO userMasterDTO)
        {
            UserList response = new UserList();

            var filename = (DateTime.Now).Ticks;
            var filepath = " ";
            //Save the file
            if (!System.String.IsNullOrEmpty(userMasterDTO.ProfileImageBase64) && userMasterDTO.IsDeleted == 0 && userMasterDTO.ProfileImageBase64.Trim() != "")
            {
                string filePath = $"{_settings.UploadPath}\\Users\\ProfileImages\\{filename}";
                filepath = Utilities.SaveFileFromBase64(userMasterDTO.WebRootPath, filePath, userMasterDTO.ProfileImageBase64);
            }
            else
            {
                filepath = userMasterDTO.ProfileImage;
            }

            _logger.LogInformation($"Started fetching all Users to View {userMasterDTO.UserId}");

            using (SqlConnection connection = new SqlConnection(base.ConnectionString))
            {
                response.Users = await connection.QueryAsync<UserMasterDTO>(SP_UserMaster_CRUD, new
                {
                    UserId = userMasterDTO.UserId,
                    FirstName = userMasterDTO.FirstName,
                    MiddleName = userMasterDTO.MiddleName,
                    LastName = userMasterDTO.LastName,
                    DOB = userMasterDTO.DOB,
                    MobileNo = userMasterDTO.MobileNo,
                    EmailId = userMasterDTO.EmailId,
                    Designation = userMasterDTO.Designation,
                    IsActive = userMasterDTO.IsActive,
                    IsDeleted = userMasterDTO.IsDeleted,
                    ActionUser = userMasterDTO.ActionUser,
                    ProfileImage = filepath,
                    CompanyId = userMasterDTO.CompanyId


                }, commandType: CommandType.StoredProcedure);

            }

            foreach (var item in response.Users)
            {
                if (File.Exists(item.ProfileImage))
                {
                    byte[] fileBytes = File.ReadAllBytes(item.ProfileImage);
                    string base64String = Convert.ToBase64String(fileBytes);
                    item.ProfileImageBase64 = base64String;
                }
            }
            return response;
        }
        public async Task<UserList> CreateUserCredentials(UserCredDTO userCredDTO)
        {

            _logger.LogInformation($"Started creating user credentials for user: {userCredDTO.UserName}");

            UserList response = new UserList();


            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                response.Users = await connection.QueryAsync<UserMasterDTO>(SP_UserLogin_CRUD, new
                {
                    UserId = userCredDTO.UserId,
                    UserName = userCredDTO.UserName,
                    UserPassword = userCredDTO.UserPassword,
                    ActionUser = userCredDTO.ActionUser
                }, commandType: CommandType.StoredProcedure);
            }
            foreach (var item in response.Users)
            {
                if (File.Exists(item.ProfileImage))
                {
                    byte[] fileBytes = File.ReadAllBytes(item.ProfileImage);
                    string base64String = Convert.ToBase64String(fileBytes);
                    item.ProfileImageBase64 = base64String;
                }
            }


            return response;
        }

        public async Task<UserWorkCenterList> UserWorkCenterCRUD(UserWorkCenterDTO userWorkCenterDTO)
        {
            UserWorkCenterList response = new UserWorkCenterList();

            _logger.LogInformation($"Started Executing UserWorkcenter Mapping and retrieving workcenters assigned to user: {userWorkCenterDTO.UserWorkCenterId}");
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                response.UserWorkCenter = await connection.QueryAsync<UserWorkCenterDTO>(SP_UserWorkCenter_CRUD, new
                {

                    UserWorkCenterId = userWorkCenterDTO.UserWorkCenterId,
                    UserId = userWorkCenterDTO.UserId,
                    WorkCenterId = userWorkCenterDTO.WorkCenterId,
                    ActionUser = userWorkCenterDTO.ActionUser,
                    IsActive = userWorkCenterDTO.IsActive,
                    IsDeleted = userWorkCenterDTO.IsDeleted

                }, commandType: CommandType.StoredProcedure);
            }


            return response;

        }

        public async Task<UserRoleList> UserRoleCRUD(UserRoleDTO userRoleDTO)
        {
            UserRoleList response = new UserRoleList();

            _logger.LogInformation($"Started Executing UserRole Mapping and retrieving role assigned to user: {userRoleDTO.UserRoleId}");
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                response.UserRole = await connection.QueryAsync<UserRoleDTO>(SP_UserRole_CRUD, new
                {

                    UserRoleId = userRoleDTO.UserRoleId,
                    UserId = userRoleDTO.UserId,
                    RoleId = userRoleDTO.RoleId,
                    ActionUser = userRoleDTO.ActionUser,
                    IsActive = userRoleDTO.IsActive,
                    IsDeleted = userRoleDTO.IsDeleted

                }, commandType: CommandType.StoredProcedure);
            }


            return response;

        }

        public async Task<UserDashboardList> UserDashboardGet(UserDashboardDTO userDashboardDTO)
        {
            UserDashboardList response = new UserDashboardList();

            _logger.LogInformation($"fetching data for userDashboard: {userDashboardDTO.ActionUser}");
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                response.UserDashboardDetails = await connection.QueryAsync<UserDashboardDTO>(SP_Dashboard_GetAllUserDetails, new
                {
                    ActionUser = userDashboardDTO.ActionUser

                }, commandType: CommandType.StoredProcedure);
            }


            return response;

        }

        public async Task<UserMasterDTO> UserStatusUpdate(UserMasterDTO userMasterDTO)
        {
            UserMasterDTO response = new UserMasterDTO();

            _logger.LogInformation($"Updating User Status as Active or Inactive for user: {userMasterDTO.ActionUser}");
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                response = await connection.QueryFirstOrDefaultAsync<UserMasterDTO>(SP_UserMaster_UpdateStatus, new
                {
                    ActionUser = userMasterDTO.ActionUser,
                    IsActive = userMasterDTO.IsActive,
                    UserId = userMasterDTO.UserId
                }, commandType: CommandType.StoredProcedure);
            }
            return response;
        }
        public async Task<DropDownList> GetAllUserList()
        {
            DropDownList response = new DropDownList();

            _logger.LogInformation($"fetching data for User List");
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                response.dropDownList = await connection.QueryAsync<DropDownDTO>(SP_UserMaster_LoadAllDDL, commandType: CommandType.StoredProcedure);
            }


            return response;
        }
        public async Task<CompanyList> GetCompany()
        {
            CompanyList response = new CompanyList();

            _logger.LogInformation($"fetching data for Company List");
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                response.Companies = await connection.QueryAsync<CompanyMasterDTO>(SP_GetCompanyName, commandType: CommandType.StoredProcedure);
            }


            return response;
        }
    }
}
