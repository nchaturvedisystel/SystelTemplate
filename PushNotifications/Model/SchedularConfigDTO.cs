using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PushNotification.Model
{
    public class SchedularConfigDTO
    {
        public string SchedularName { get; set; }
        public string SchedularCode { get; set; }
        public string SchedularDesc { get; set; }
        public int FrequencyInMins { get; set; }
        public string SchedularType { get; set; }

    }
}
