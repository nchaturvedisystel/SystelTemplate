using Application.DTOs.SupportDesk;
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
using Application.Interfaces.SupportDesk;

namespace Infrastructure.Persistance.Services.SupportDesk
{
    public class DashboardService: DABase, ISupportDashboard
    {
        APISettings _settings;
        private ILogger<DashboardService> _logger;

        private const string SP_Dashboard_Admin = "spd.Dashboard_Admin";

        public DashboardService(IOptions<ConnectionSettings> connectionSettings, ILogger<DashboardService> logger, IOptions<APISettings> settings) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
            _settings = settings.Value;
        }
        public async Task<DashboardDTO> GetAdminDashboardData(InputParams inputParams)
        {
            DashboardDTO response = new DashboardDTO();

            _logger.LogInformation($"Getting Data for Support Ticket Desk AdminDashboard for StartDate:  {Convert.ToString(inputParams.StartDate)}, EndDate :  {Convert.ToString(inputParams.EndDate)}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    var reader = await connection.QueryMultipleAsync(SP_Dashboard_Admin, new
                    {
                        StartDate = inputParams.StartDate,
                        EndDate = inputParams.EndDate,
                    }, commandType: CommandType.StoredProcedure);

                    response.TicketCount = await reader.ReadAsync<KeyValue>();
                    response.PriorityWiseCount = await reader.ReadAsync<KeyValue>();
                    response.CategoryWiseCount = await reader.ReadAsync<KeyValue>();
                    response.ClientWiseCount = await reader.ReadAsync<KeyData>();
                    response.SupportUserWiseCount = await reader.ReadAsync<KeyData>();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }
    }
}
