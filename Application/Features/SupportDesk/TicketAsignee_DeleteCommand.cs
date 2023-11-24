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
    public class TicketAsignee_DeleteCommand : IRequest<TicketAsigneeList>
    {
        public TicketAsigneeDTO TicketAsigneeDTO { get; set; }
    }
    internal class TicketAsignee_DeleteCommandHandler : IRequestHandler<TicketAsignee_DeleteCommand, TicketAsigneeList>
    {
        protected readonly ITicketAsignee _ticketAsignee;
        public TicketAsignee_DeleteCommandHandler(ITicketAsignee ticketAsignee)
        {
            _ticketAsignee = ticketAsignee;
        }
        public async Task<TicketAsigneeList> Handle(TicketAsignee_DeleteCommand request, CancellationToken cancellationToken)
        {
            return await _ticketAsignee.TicketAsignee_Delete(request.TicketAsigneeDTO);
        }
    }
}
