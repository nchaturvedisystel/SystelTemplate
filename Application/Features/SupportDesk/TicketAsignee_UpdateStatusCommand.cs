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
    public class TicketAsignee_UpdateStatusCommand : IRequest<TicketAsigneeList>
    {
        public TicketAsigneeDTO TicketAsigneeDTO { get; set; }
    }
    internal class TicketAsignee_UpdateStatusCommandHandler : IRequestHandler<TicketAsignee_UpdateStatusCommand, TicketAsigneeList>
    {
        protected readonly ITicketAsignee _ticketAsignee;
        public TicketAsignee_UpdateStatusCommandHandler(ITicketAsignee ticketAsignee)
        {
            _ticketAsignee = ticketAsignee;
        }
        public async Task<TicketAsigneeList> Handle(TicketAsignee_UpdateStatusCommand request, CancellationToken cancellationToken)
        {
            return await _ticketAsignee.TicketAsignee_UpdateStatus(request.TicketAsigneeDTO);
        }
    }
}
