using NotificationService.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationService.Interface
{
    public interface IPushNotification
    {
        Task<PushNotificationList> GetNotificationList(PushNotificationDTO pushNotification);
        PushNotificationList GetPushNotifications();
        void UpdatePushNotifications(DataTable pushNotificationList);
        void InsertPushNotifications(DataTable pushNotificationList);

    }
}
