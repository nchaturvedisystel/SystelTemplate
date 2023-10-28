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
    public class SupportTicketReOpenCommand : IRequest<SupportTicketDTO>
    {
        public SupportTicketDTO supportTicketDTO { get; set; }
    }
    internal class SupportTicketReOpenCommandHandler : IRequestHandler<SupportTicketReOpenCommand, SupportTicketDTO>
    {
        protected readonly ISupportTicket _supportTicket;
        public SupportTicketReOpenCommandHandler(ISupportTicket supportTicket)
        {
            _supportTicket = supportTicket;
        }
        public async Task<SupportTicketDTO> Handle(SupportTicketReOpenCommand request, CancellationToken cancellationToken)
        {
            return await _supportTicket.SupportTickets_ReOpenTicket(request.supportTicketDTO);
        }
    }
}
