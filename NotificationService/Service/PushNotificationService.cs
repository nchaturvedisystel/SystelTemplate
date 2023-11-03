using NotificationService.Common;
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
    public class PushNotificationService : IPushNotification
    {
        private const string SP_GetPushNotifications = "ann.GetPushNotifications";
        private const string SP_NotificationMaster_UpdateStatus = "ann.NotificationMaster_UpdateStatus";
        private const string SP_NotificationMaster_Insert = "ann.NotificationMaster_Insert";
        protected readonly Logging logging = new Logging();
        public PushNotificationService()
        {
        }

        public async Task<PushNotificationList> GetNotificationList(PushNotificationDTO pushNotification)
        {
            PushNotificationList response = new PushNotificationList();
            try
            {
                using (SqlConnection connection = new SqlConnection(SessionObject.DBConn))
                {
                    response.NotificationList = await connection.QueryAsync<PushNotificationDTO>(SP_GetPushNotifications, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.Service.PushNotificationService/GetNotificationList : " + ex.Message);
                throw ex;
            }
            return response;
        }

        public PushNotificationList GetPushNotifications()
        {
            PushNotificationList response = new PushNotificationList();
            try
            {
                using (SqlConnection connection = new SqlConnection(SessionObject.DBConn))
                {
                    response.NotificationList = connection.Query<PushNotificationDTO>(SP_GetPushNotifications, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.Service.PushNotificationService/GetPushNotifications : " + ex.Message);
                throw ex;
            }
            return response;
        }

        public void UpdatePushNotifications(DataTable pushNotificationList)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(SessionObject.DBConn))
                {
                    connection.Query<PushNotificationDTO>(SP_NotificationMaster_UpdateStatus, new
                    {
                        typNotificationMaster = pushNotificationList.AsTableValuedParameter("dbo.typNotificationMaster")
                    },
                         commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.Service.PushNotificationService/UpdatePushNotifications : " + ex.Message);
                throw ex;
            }
        }
        public void InsertPushNotifications(DataTable pushNotificationList)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(SessionObject.DBConn))
                {
                    connection.Query<PushNotificationDTO>(SP_NotificationMaster_Insert, new
                    {
                        typNotificationMaster = pushNotificationList.AsTableValuedParameter("dbo.typNotificationMaster")
                    },
                         commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.Service.PushNotificationService/InsertPushNotifications : " + ex.Message);
                throw ex;
            }
        }

    }
}
