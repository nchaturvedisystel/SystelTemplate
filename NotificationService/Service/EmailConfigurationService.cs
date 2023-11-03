using NotificationService.Interface;
using NotificationService.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace NotificationService.Service
{
    public class EmailConfigurationService : IEmailConfiguration
    {
        private const string SP_GetEmailConfigDetails = "ann.GetEmailConfigDetails";

        public EmailConfigurationService()
        {
        }

        public EmailConfigurationList GetEmailConfigDetails()
        {
            EmailConfigurationList response = new EmailConfigurationList();

            using (SqlConnection connection = new SqlConnection(SessionObject.DBConn))
            {
                response.EmailConfigList = connection.Query<EmailConfigurationDTO>(SP_GetEmailConfigDetails, commandType: CommandType.StoredProcedure);

            }
            return response;
        }
    }
}
