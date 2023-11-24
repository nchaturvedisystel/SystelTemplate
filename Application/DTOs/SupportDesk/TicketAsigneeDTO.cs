using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.SupportDesk
{
    public class TicketAsigneeDTO
    {
        public int TAId { get; set; }
        public int TicketId { get; set; }
        public string AssignedTo { get; set; }
	    public decimal WorkRatio { get; set; }
	    public string AssignDesc { get; set; }
	    public string AStatus { get; set; }
	    public string ActionUser { get; set; }
        public string AssignedToName { get; set; }
        public string AssignedByName { get; set; }
    }
    public class TicketAsigneeList
    {
        public IEnumerable<TicketAsigneeDTO> TicketAsignee { get; set; }
    }
}
