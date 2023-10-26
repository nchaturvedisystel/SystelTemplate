using Application.DTOs.Common;
using Application.Interfaces.Common;
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

namespace Infrastructure.Persistance.Services.Common
{
    public class UserTimeTrackingService : DABase, IUserTimeTracking
    {
        private const string SP_UserTimeTrackingCreate = "ana.UserTimeTracking_Create";

        private const string SP_Dashboard_GetDetails = "ana.Dashboard_GetDetails";

        private ILogger<UserTimeTrackingService> _logger;
        public UserTimeTrackingService(IOptions<ConnectionSettings> connectionSettings, ILogger<UserTimeTrackingService> logger) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
        }
        public async Task<UserTimeTrackingDTOList> UserTimeTracking(UserTimeTrackingDTO userTimeTrackingDTO)
        {
            UserTimeTrackingDTOList response = new UserTimeTrackingDTOList();
            using (SqlConnection connection = new SqlConnection(base.ConnectionString))
            {
                response.List = await connection.QueryAsync<UserTimeTrackingDTO>(SP_UserTimeTrackingCreate, new
                {
                    PageCode = userTimeTrackingDTO.PageCode,
                    ActionUser = userTimeTrackingDTO.ActionUser,
                    StartTime = userTimeTrackingDTO.StartTime,
                    EndTime = userTimeTrackingDTO.EndTime,
                    Duration = userTimeTrackingDTO.Duration

                }, commandType: CommandType.StoredProcedure);
            }
            return response;
        }

        public async Task<DashboardList> DashboardGet(int ActionUser)
        {
            DashboardList response = new DashboardList();

            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();

                using (var multi = await connection.QueryMultipleAsync(SP_Dashboard_GetDetails, new { ActionUser  = ActionUser},commandType: CommandType.StoredProcedure))
                {
                    response.DashList = await multi.ReadAsync<DashboardDTO>();
                    response.WorkProgressList = await multi.ReadAsync<WorkProgressDTO>();
                    response.TimeSpentWorkList = await multi.ReadAsync<TimeSpentWorkDTO>();
                    response.UpcomingWorkList = await multi.ReadAsync<UpcomingWorkDTO>();
                    response.OngoingWorkList = await multi.ReadAsync<OngoingWorkDTO>();
                }
            }

            return response;
        }
    }
}
