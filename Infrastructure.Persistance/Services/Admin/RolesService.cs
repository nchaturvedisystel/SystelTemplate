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
    public class RolesService : DABase, IRole
    {
        private const string SP_RolesMaster_CRUD = "ana.RolesMaster_CRUD";


        private ILogger<RolesService> _logger;
        public RolesService(IOptions<ConnectionSettings> connectionSettings, ILogger<RolesService> logger) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
        }

        public async Task<RolesList> ManageRoles(RolesDTO rolesDTO)
        {
            RolesList response = new RolesList();

            _logger.LogInformation($"Started fetching all Roles by Id:{rolesDTO.RoleId}");

            using (SqlConnection connection = new SqlConnection(base.ConnectionString))
            {
                response.Roles = await connection.QueryAsync<RolesDTO>(SP_RolesMaster_CRUD, new
                {
                    RoleId = rolesDTO.RoleId,
                    RoleName = rolesDTO.RoleName,
                    RoleCode = rolesDTO.RoleCode,
                    RoleDesc = rolesDTO.RoleDesc,
                    ActionUser = rolesDTO.ActionUser,
                    IsActive = rolesDTO.IsActive,
                    IsDeleted = rolesDTO.IsDeleted,

                }, commandType: CommandType.StoredProcedure);

            }
            return response;
        }


    }
}
