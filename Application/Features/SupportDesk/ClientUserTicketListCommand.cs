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
    public class ClientUserTicketListCommand : IRequest<ClientUserTicketList>
    {
        public SupportTicketDTO supportTicketDTO { get; set; }
    }
    internal class ClientUserTicketListCommandHandler : IRequestHandler<ClientUserTicketListCommand, ClientUserTicketList>
    {
        protected readonly ISupportTicket _supportTicket;
        public ClientUserTicketListCommandHandler(ISupportTicket supportTicket)
        {
            _supportTicket = supportTicket;
        }
        public async Task<ClientUserTicketList> Handle(ClientUserTicketListCommand request, CancellationToken cancellationToken)
        {
            return await _supportTicket.SupportTickets_GetByUserId(request.supportTicketDTO);
        }
    }
}
