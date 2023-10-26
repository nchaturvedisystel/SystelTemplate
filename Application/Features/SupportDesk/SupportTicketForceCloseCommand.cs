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
    public class SupportTicketForceCloseCommand : IRequest<SupportTicketDTO>
    {
        public SupportTicketDTO supportTicketDTO { get; set; }
    }
    internal class SupportTicketForceCloseCommandHandler : IRequestHandler<SupportTicketForceCloseCommand, SupportTicketDTO>
    {
        protected readonly ISupportTicket _supportTicket;
        public SupportTicketForceCloseCommandHandler(ISupportTicket supportTicket)
        {
            _supportTicket = supportTicket;
        }
        public async Task<SupportTicketDTO> Handle(SupportTicketForceCloseCommand request, CancellationToken cancellationToken)
        {
            return await _supportTicket.SupportTickets_ForceCloseTicket(request.supportTicketDTO);
        }
    }
}
