using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.SupportDesk
{
    public class KeyValue
    {
        public string Key { get; set; }
        public int Value { get; set; }
    }
    public class KeyData
    { 
        public string Key { get; set; }
        public int TotalTickets { get; set; } 
        public int CloseTickets { get; set; }
        public int InProgressTickets { get; set;}
        public int OpenTickets { get; set;}
        public int Others { get;set;}
    }
    public class InputParams
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
    public class DashboardDTO
    {
        public IEnumerable<KeyValue> TicketCount { get; set; }
        public IEnumerable<KeyValue> PriorityWiseCount { get; set; }
        public IEnumerable<KeyValue> CategoryWiseCount { get; set; }
        public IEnumerable<KeyData> ClientWiseCount { get; set;}
        public IEnumerable<KeyData> SupportUserWiseCount { get; set; }
    }
}
