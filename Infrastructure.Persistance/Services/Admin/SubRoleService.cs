using Application.DTOs.Admin;
using Application.Interfaces.Admin;
using Domain.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace Infrastructure.Persistance.Services.Admin
{
    public class SubRoleService : DABase, ISubRole
    {
        private const string SP_SubRoles_CRUD = "ana.SubRoles_CRUD";
        private ILogger<SubRoleService> _logger;
        public SubRoleService(IOptions<ConnectionSettings> connectionSettings, ILogger<SubRoleService> logger) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
        }

        public async Task<SubRolesList> SubRolesMapping(SubRolesDTO subRolesDTO)
        {
            SubRolesList response = new SubRolesList();

            _logger.LogInformation($"Started fetching all SubRoles by Id:{subRolesDTO.SubRoleId} ");

            using (SqlConnection connection = new SqlConnection(base.ConnectionString))
            {
                response.SubRoles = await connection.QueryAsync<SubRolesDTO>(SP_SubRoles_CRUD, new
                {
                    SubRoleId = subRolesDTO.SubRoleId,
                    RoleId = subRolesDTO.RoleId,
                    MenuId = subRolesDTO.MenuId,
                    IsActive = subRolesDTO.IsActive,
                    IsDeleted = subRolesDTO.IsDeleted,
                    ActionUser = subRolesDTO.ActionUser
                }, commandType: CommandType.StoredProcedure);

            }
            return response;
        }
    }
}
