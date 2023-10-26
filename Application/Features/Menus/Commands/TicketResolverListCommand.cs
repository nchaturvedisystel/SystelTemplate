using Application.DTOs.SupportDesk;
using Application.Interfaces;
using Application.Interfaces.Admin;
using Application.Interfaces.SupportDesk;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Menus.Commands
{
    public class TicketResolverListCommand : IRequest<TicketList>
    {
        public SupportTicketDTO supportTicketDTO { get; set; }
    }

    internal class TicketResolverListCommandHandler : IRequestHandler<TicketResolverListCommand, TicketList>
    {
        protected readonly ITicketResolverList _ticketResolverList;
        public TicketResolverListCommandHandler(ITicketResolverList ticketResolverList)
        {
            _ticketResolverList = ticketResolverList;
        }
        public async Task<TicketList> Handle(TicketResolverListCommand request, CancellationToken cancellationToken)
        {
            return await _ticketResolverList.TicketResolverList(request.supportTicketDTO);
        }
    }
}
