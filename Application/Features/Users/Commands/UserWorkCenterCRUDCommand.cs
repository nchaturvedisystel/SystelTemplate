using Application.DTOs.User;
using Application.Interfaces.User;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Users.Commands
{
    public class UserWorkCenterCRUDCommand : IRequest<UserWorkCenterList>
    {
        public UserWorkCenterDTO userWorkCenterDTO { get; set; }
    }

    internal class UserWorkCenterHandler : IRequestHandler<UserWorkCenterCRUDCommand, UserWorkCenterList>
    {
        protected readonly IUserMaster _userWorkCenter;
        public UserWorkCenterHandler(IUserMaster userWorkCenter)
        {
            _userWorkCenter = userWorkCenter;
        }

        public async Task<UserWorkCenterList> Handle(UserWorkCenterCRUDCommand request, CancellationToken cancellationToken)
        {
            return await _userWorkCenter.UserWorkCenterCRUD(request.userWorkCenterDTO);
        }
    }
}
