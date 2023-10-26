using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.SupportDesk
{
    public class TicketActivityDTO
    {
        public int TicketActivityId { get; set; }
        public int TicketId { get; set; }
        public string TicketComments { get; set; }
        public int IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
    }
    public class TicketActivityList
    {
        public IEnumerable<TicketActivityDTO> TicketActivities { get; set; }
    }
}
