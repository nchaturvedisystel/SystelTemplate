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
    public class TicketActivityService : DABase, ITicketActivity
    {
        APISettings _settings;
        private const string SP_InsertTicketActivity = "spd.InsertTicketActivity";

        private ILogger<TicketService> _logger;

        public TicketActivityService(IOptions<ConnectionSettings> connectionSettings, ILogger<TicketService> logger, IOptions<APISettings> settings) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
            _settings = settings.Value;
        }

        public async Task<TicketActivityList> TicketDescription(TicketActivityDTO ticketActivityDTO)
        {
            TicketActivityList response = new TicketActivityList();

            _logger.LogInformation($"Inserting Ticket Activity for Ticket :  {ticketActivityDTO.TicketId}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.TicketActivities = await connection.QueryAsync<TicketActivityDTO>(SP_InsertTicketActivity, new
                    {
                        TicketId = ticketActivityDTO.TicketId,
                        TicketComments = ticketActivityDTO.TicketComments,
                        CreatedBy = ticketActivityDTO.CreatedBy,
                    }, commandType: CommandType.StoredProcedure);

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
