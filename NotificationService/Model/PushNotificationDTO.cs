using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationService.Model
{
    public class PushNotificationDTO
    {

        public long NotificationId { get; set; }
        public string NType { get; set; }
        public string NSubject { get; set; }
        public string NContent { get; set; }
        public string NStatus { get; set; }
        public string NTo { get; set; }
        public string NCc { get; set; }
        public string NBcc { get; set; }
        public int RetryCount { get; set; }
        public int IsDeleted { get; set; }
        public string Remarks { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string AttachmentPath { get; set; }
        public string CreatedBy { get; set; }
        public string PostSendDataSourceType { get; set; }
        public string PostSendDataSourceDef { get; set; }
        public int DBConnId { get; set; }
        public string ConnName { get; set; }
        public string ServerName { get; set; }
        public string UserName { get; set; }
        public string Passwrd { get; set; }
        public string DBName { get; set; }

    }

    public class PushNotificationList
    {
        public IEnumerable<PushNotificationDTO> NotificationList { get; set; }
    }
}
