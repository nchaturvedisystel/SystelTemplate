using Application.DTOs.Common;
using Application.Features.Menus.Commands;
using Application.Interfaces.Common;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Common.Commands
{
    public  class UserTimeTrackingCommand : IRequest<UserTimeTrackingDTOList>
    {
        public UserTimeTrackingDTO userTimeTrackingDTO { get; set; }
    }
    internal class UserTimeTrackingHandler : IRequestHandler<UserTimeTrackingCommand,UserTimeTrackingDTOList>
    {
        protected readonly IUserTimeTracking _userTimeTrackingService;

        public UserTimeTrackingHandler(IUserTimeTracking userTimeTrackingService)
        {
            _userTimeTrackingService = userTimeTrackingService;
        }
        public async Task<UserTimeTrackingDTOList> Handle(UserTimeTrackingCommand request, CancellationToken cancellationToken)
        {
            return await _userTimeTrackingService.UserTimeTracking(request.userTimeTrackingDTO);
        }
    }
}
