using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PushNotification.Model
{
    public class AlertsServiceVariablesDTO
    {
        public int VariableId { get; set; }
        public int ServiceId { get; set; }
        public string VarInstance { get; set; }
        public string VarValue { get; set; }
        public string VarType { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public int ActionUser { get; set; }
    }
}
