using PushNotifications.Model;
using System.Data.SqlClient;
using Common;
using System.Configuration;
using Dapper;
using PushNotifications.Interface;

namespace PushNotifications.Service
{
    public class ServiceMasterService : IServiceMaster
    {
        public Logging _logging = new Logging();
        public ServiceMasterList GetAllServices()
        {
            ServiceMasterList servMasterList = new ServiceMasterList();
            try
            {
                _logging.LogInfo($"Fetching all the Services List");

                string query = "SELECT ServiceId, Title, AlertType, EmailTo, AttachmentType,AttachmentFileType,IsActive,IsDeleted FROM [ann].[AlertsServiceMaster]";
                using (SqlConnection connection = new SqlConnection(DBConn.GetConnectionString(ConfigurationManager.AppSettings["AppKeyPath"])))
                {
                    servMasterList.Items = connection.Query<ServiceDTO>(query, new { }).ToList();
                }
            }
            catch (Exception ex)
            {
                _logging.LogError($"Error while fetching service list, ex: {ex.Message}");
                throw ex;
            }
            return servMasterList;
        }
    }
}
