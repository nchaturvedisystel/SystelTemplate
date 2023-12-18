using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace PushNotification.Model
{
    public class ServiceSchedularDTO
    {
        public int MappperId { get; set; }
        public int ServiceId { get; set; }
        public int SchedularId { get; set; }
        public DateTime LastExecutionTime { get; set; }
        public DateTime NextExecutionTime { get; set; }
        public DateTime StartsFrom { get; set; }
        public DateTime EndsOn { get; set; }
        public DateTime DailyStartOn { get; set; }
        public DateTime DailyEndsOn { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public int ActionUser { get; set; }
    }
}
