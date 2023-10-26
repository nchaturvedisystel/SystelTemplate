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
    public class TicketActivityCommand : IRequest<TicketActivityList>
    {
        public TicketActivityDTO ticketActivityDTO { get; set; }
    }

    internal class TicketActivityCommandHandler : IRequestHandler<TicketActivityCommand, TicketActivityList>
    {
        protected readonly ITicketActivity _ticketActivity;
        public TicketActivityCommandHandler(ITicketActivity supportTicket)
        {
            _ticketActivity = supportTicket;
        }
        public async Task<TicketActivityList> Handle(TicketActivityCommand request, CancellationToken cancellationToken)
        {
            return await _ticketActivity.TicketDescription(request.ticketActivityDTO);
        }
    }
}
