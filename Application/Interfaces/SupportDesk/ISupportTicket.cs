using Application.DTOs.SupportDesk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.SupportDesk
{
    public interface ISupportTicket
    {
        public Task<TicketList> ManageTicket(SupportTicketDTO supportTicketDTO);
        public Task<ClientUserTicketList> SupportTickets_GetByUserId(SupportTicketDTO supportTicketDTO);
        public Task<TicketList> SupportTickets_GetTicketDetails(SupportTicketDTO supportTicketDTO);
        public Task<SupportTicketDTO> SupportTickets_ForceCloseTicket(SupportTicketDTO supportTicketDTO);
        public Task<SupportTicketDTO> SupportTickets_ReOpenTicket(SupportTicketDTO supportTicketDTO);
        public Task<SupportTicketDTO> SupportTickets_AssignToUser(SupportTicketDTO supportTicketDTO);

    }
}
