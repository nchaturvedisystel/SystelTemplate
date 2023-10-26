using Application.DTOs.Admin;
using Application.DTOs.SupportDesk;
using Application.Features.Admin.Commands;
using Application.Interfaces.Admin;
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
    public class SupportTicketCommand : IRequest<TicketList>
    {
        public SupportTicketDTO supportTicketDTO { get; set; }
    }

    internal class SupportTicketCommandHandler : IRequestHandler<SupportTicketCommand, TicketList>
    {
        protected readonly ISupportTicket _supportTicket;
        public SupportTicketCommandHandler(ISupportTicket supportTicket)
        {
            _supportTicket = supportTicket;
        }
        public async Task<TicketList> Handle(SupportTicketCommand request, CancellationToken cancellationToken)
        {
            return await _supportTicket.ManageTicket(request.supportTicketDTO);
        }
    }

}
