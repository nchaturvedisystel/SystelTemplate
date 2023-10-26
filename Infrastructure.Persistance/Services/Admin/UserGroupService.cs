using Application.DTOs.Admin;
using Application.Interfaces.Admin;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Data;
using System.Threading.Tasks;
using Domain.Settings;
using Microsoft.Extensions.Options;
using Dapper;

namespace Infrastructure.Persistance.Services.Admin
{
    public class UserGroupService : DABase, IUserGroup
    {
        private const string SP_UserGroupMaster_CRUD = "ana.UserGroupMaster_CRUD";
        private ILogger<UserGroupService> _logger;
        public UserGroupService(IOptions<ConnectionSettings> connectionSettings, ILogger<UserGroupService> logger) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
        }

        public async Task<UserGroupList> ManageUserGroup(UserGroupDTO userGroupDTO)
        {
            UserGroupList response = new UserGroupList();

            _logger.LogInformation($"Started fetching all Groups by Id: {userGroupDTO.GroupId} ");

            using (SqlConnection connection = new SqlConnection(base.ConnectionString))
            {
                response.Groups = await connection.QueryAsync<UserGroupDTO>(SP_UserGroupMaster_CRUD, new
                {
                    GroupId = userGroupDTO.GroupId,
                    GroupName = userGroupDTO.GroupName,
                    GroupCode = userGroupDTO.GroupCode,
                    GroupDesc = userGroupDTO.GroupDesc,
                    ActionUser = userGroupDTO.ActionUser,
                    IsActive = userGroupDTO.IsActive,
                    IsDeleted = userGroupDTO.IsDeleted,

                }, commandType: CommandType.StoredProcedure);

            }
            return response;
        }
    }
}
