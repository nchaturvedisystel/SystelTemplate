using Application.DTOs.SupportDesk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.SupportDesk
{
    public interface ITicketAsignee
    {
        public Task<TicketAsigneeList> TicketAsignee_Insert(TicketAsigneeDTO ticketAsigneeDTO);
        public Task<TicketAsigneeList> TicketAsignee_Delete(TicketAsigneeDTO ticketAsigneeDTO);
        public Task<TicketAsigneeList> TicketAsignee_Update(TicketAsigneeDTO ticketAsigneeDTO);
        public Task<TicketAsigneeList> TicketAsignee_UpdateStatus(TicketAsigneeDTO ticketAsigneeDTO);
        public Task<TicketAsigneeList> TicketAsignee_GetAllByTicketId(TicketAsigneeDTO ticketAsigneeDTO);

    }
}
