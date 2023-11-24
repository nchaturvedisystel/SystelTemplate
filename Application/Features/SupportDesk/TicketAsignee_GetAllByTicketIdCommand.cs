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
    public class TicketAsignee_GetAllByTicketIdCommand : IRequest<TicketAsigneeList>
    {
        public TicketAsigneeDTO TicketAsigneeDTO { get; set; }
    }
    internal class TicketAsignee_GetAllByTicketIdCommandHandler : IRequestHandler<TicketAsignee_GetAllByTicketIdCommand, TicketAsigneeList>
    {
        protected readonly ITicketAsignee _ticketAsignee;
        public TicketAsignee_GetAllByTicketIdCommandHandler(ITicketAsignee ticketAsignee)
        {
            _ticketAsignee = ticketAsignee;
        }
        public async Task<TicketAsigneeList> Handle(TicketAsignee_GetAllByTicketIdCommand request, CancellationToken cancellationToken)
        {
            return await _ticketAsignee.TicketAsignee_GetAllByTicketId(request.TicketAsigneeDTO);
        }
    }
}
