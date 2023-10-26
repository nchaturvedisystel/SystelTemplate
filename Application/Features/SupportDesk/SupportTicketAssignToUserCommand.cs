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
    public class SupportTicketAssignToUserCommand : IRequest<SupportTicketDTO>
    {
        public SupportTicketDTO supportTicketDTO { get; set; }
    }
    internal class SupportTicketAssignToUserCommandHandler : IRequestHandler<SupportTicketAssignToUserCommand, SupportTicketDTO>
    {
        protected readonly ISupportTicket _supportTicket;
        public SupportTicketAssignToUserCommandHandler(ISupportTicket supportTicket)
        {
            _supportTicket = supportTicket;
        }
        public async Task<SupportTicketDTO> Handle(SupportTicketAssignToUserCommand request, CancellationToken cancellationToken)
        {
            return await _supportTicket.SupportTickets_AssignToUser(request.supportTicketDTO);
        }
    }
}
