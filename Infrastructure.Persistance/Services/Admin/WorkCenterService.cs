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
using Application.DTOs.Admin;
using Application.Interfaces.Admin;

namespace Infrastructure.Persistance.Services.Traveler
{
    public class WorkCenterService : DABase, IWorkCenter
    {

        private const string SP_WorkCenterMaster_CRUD = "ana.WorkCenterMaster_CRUD";
        private ILogger<WorkCenterService> _logger;
        public WorkCenterService(IOptions<ConnectionSettings> connectionSettings, ILogger<WorkCenterService> logger) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
        }

        public async Task<WorkCenterList> ManageWorkCenter(WorkCenterDTO workCenterDTO)
        {
            WorkCenterList response = new WorkCenterList();

            _logger.LogInformation($"Started fetching all workcenter by workCenterId {workCenterDTO.WorkCenterId}");

            using (SqlConnection connection = new SqlConnection(base.ConnectionString))
            {
                response.Items = await connection.QueryAsync<WorkCenterDTO>(SP_WorkCenterMaster_CRUD, new
                {
                    WorkCenterId = workCenterDTO.WorkCenterId,
                    WorkCenterName = workCenterDTO.WorkCenterName,
                    WorkCenterCode = workCenterDTO.WorkCenterCode,
                    WorkCenterDesc = workCenterDTO.WorkCenterDesc,
                    DisplaySeq = workCenterDTO.DisplaySeq,
                    IsActive = workCenterDTO.IsActive,
                    IsDeleted = workCenterDTO.IsDeleted,
                    ActionUser = workCenterDTO.ActionUser,
                }, commandType: CommandType.StoredProcedure);

            }
            return response;
        }
    }
}
