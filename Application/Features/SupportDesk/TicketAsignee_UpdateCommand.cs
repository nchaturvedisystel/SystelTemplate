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
    public class TicketAsignee_UpdateCommand : IRequest<TicketAsigneeList>
    {
        public TicketAsigneeDTO TicketAsigneeDTO { get; set; }
    }
    internal class TicketAsignee_UpdateCommandHandler : IRequestHandler<TicketAsignee_UpdateCommand, TicketAsigneeList>
    {
        protected readonly ITicketAsignee _ticketAsignee;
        public TicketAsignee_UpdateCommandHandler(ITicketAsignee ticketAsignee)
        {
            _ticketAsignee = ticketAsignee;
        }
        public async Task<TicketAsigneeList> Handle(TicketAsignee_UpdateCommand request, CancellationToken cancellationToken)
        {
            return await _ticketAsignee.TicketAsignee_Update(request.TicketAsigneeDTO);
        }
    }
}
