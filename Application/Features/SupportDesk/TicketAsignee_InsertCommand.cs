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
    public class TicketAsignee_InsertCommand : IRequest<TicketAsigneeList>
    {
        public TicketAsigneeDTO TicketAsigneeDTO { get; set; }
    }
    internal class TicketAsignee_InsertCommandHandler : IRequestHandler<TicketAsignee_InsertCommand, TicketAsigneeList>
    {
        protected readonly ITicketAsignee _ticketAsignee;
        public TicketAsignee_InsertCommandHandler(ITicketAsignee ticketAsignee)
        {
            _ticketAsignee = ticketAsignee;
        }
        public async Task<TicketAsigneeList> Handle(TicketAsignee_InsertCommand request, CancellationToken cancellationToken)
        {
            return await _ticketAsignee.TicketAsignee_Insert(request.TicketAsigneeDTO);
        }
    }
}
