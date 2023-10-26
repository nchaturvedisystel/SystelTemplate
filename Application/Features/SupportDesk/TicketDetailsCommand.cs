using Application.DTOs.SupportDesk;
using Application.Interfaces.SupportDesk;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.SupportDesk
{
    public class TicketDetailsCommand : IRequest<TicketList>
    {
        public SupportTicketDTO supportTicketDTO { get; set; }
    }

    internal class TicketDetailsCommandHandler : IRequestHandler<TicketDetailsCommand, TicketList>
    {
        protected readonly ISupportTicket _supportTicket;
        public TicketDetailsCommandHandler(ISupportTicket supportTicket)
        {
            _supportTicket = supportTicket;
        }
        public async Task<TicketList> Handle(TicketDetailsCommand request, CancellationToken cancellationToken)
        {
            return await _supportTicket.SupportTickets_GetTicketDetails(request.supportTicketDTO);
        }
    }
}
