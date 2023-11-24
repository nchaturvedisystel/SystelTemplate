using Application.DTOs.SupportDesk;
using Application.Interfaces.SupportDesk;
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
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Infrastructure.Persistance.Services.SupportDesk
{
    public class TicketAsigneeService : DABase, ITicketAsignee
    {
        APISettings _settings;
        private ILogger<TicketService> _logger;

        private const string SP_TicketAsignee_Insert = "spd.TicketAsignee_Insert";
        private const string SP_TicketAsignee_Delete = "spd.TicketAsignee_Delete";
        private const string SP_TicketAsignee_Update = "spd.TicketAsignee_Update";
        private const string SP_TicketAsignee_UpdateStatus = "spd.TicketAsignee_UpdateStatus";
        private const string SP_TicketAsignee_GetAllByTicketId = "spd.TicketAsignee_GetAllByTicketId";

        public TicketAsigneeService(IOptions<ConnectionSettings> connectionSettings, ILogger<TicketService> logger, IOptions<APISettings> settings) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
            _settings = settings.Value;
        }
        public async Task<TicketAsigneeList> TicketAsignee_Insert(TicketAsigneeDTO ticketAsigneeDTO)
        {
            TicketAsigneeList response = new TicketAsigneeList();

            _logger.LogInformation($"Inserting Ticket Asignee for Ticket :  {ticketAsigneeDTO.TicketId}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.TicketAsignee = await connection.QueryAsync<TicketAsigneeDTO>(SP_TicketAsignee_Insert, new
                    {
                        TicketId = ticketAsigneeDTO.TicketId,
                        AssignedTo = ticketAsigneeDTO.AssignedTo,
                        WorkRatio = ticketAsigneeDTO.WorkRatio,
                        AssignDesc = ticketAsigneeDTO.AssignDesc,
                        AStatus = ticketAsigneeDTO.AStatus,
                        ActionUser = ticketAsigneeDTO.ActionUser,
                    }, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }
        public async Task<TicketAsigneeList> TicketAsignee_Delete(TicketAsigneeDTO ticketAsigneeDTO)
        {
            TicketAsigneeList response = new TicketAsigneeList();

            _logger.LogInformation($"Deleting Ticket Asignee for Ticket TAId :  {ticketAsigneeDTO.TAId}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.TicketAsignee = await connection.QueryAsync<TicketAsigneeDTO>(SP_TicketAsignee_Delete, new
                    {
                        TAId = ticketAsigneeDTO.TAId,
                        ActionUser = ticketAsigneeDTO.ActionUser,
                    }, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }
        public async Task<TicketAsigneeList> TicketAsignee_Update(TicketAsigneeDTO ticketAsigneeDTO)
        {
            TicketAsigneeList response = new TicketAsigneeList();

            _logger.LogInformation($"Inserting Ticket Asignee for Ticket :  {ticketAsigneeDTO.TicketId}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.TicketAsignee = await connection.QueryAsync<TicketAsigneeDTO>(SP_TicketAsignee_Update, new
                    {
                        TAId = ticketAsigneeDTO.TAId,
                        WorkRatio = ticketAsigneeDTO.WorkRatio,
                        AssignDesc = ticketAsigneeDTO.AssignDesc,
                        ActionUser = ticketAsigneeDTO.ActionUser,
                    }, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }
        public async Task<TicketAsigneeList> TicketAsignee_UpdateStatus(TicketAsigneeDTO ticketAsigneeDTO)
        {
            TicketAsigneeList response = new TicketAsigneeList();

            _logger.LogInformation($"Inserting Ticket Asignee for Ticket :  {ticketAsigneeDTO.TicketId}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.TicketAsignee = await connection.QueryAsync<TicketAsigneeDTO>(SP_TicketAsignee_UpdateStatus, new
                    {
                        TAId = ticketAsigneeDTO.TAId,
                        AStatus = ticketAsigneeDTO.AStatus,
                        ActionUser = ticketAsigneeDTO.ActionUser,
                    }, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }
        public async Task<TicketAsigneeList> TicketAsignee_GetAllByTicketId(TicketAsigneeDTO ticketAsigneeDTO)
        {
            TicketAsigneeList response = new TicketAsigneeList();

            _logger.LogInformation($"Inserting Ticket Asignee for Ticket :  {ticketAsigneeDTO.TicketId}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.TicketAsignee = await connection.QueryAsync<TicketAsigneeDTO>(SP_TicketAsignee_GetAllByTicketId, new
                    {
                        TicketId = ticketAsigneeDTO.TicketId,
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
