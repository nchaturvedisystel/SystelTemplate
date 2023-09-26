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
    public class UserStatusUpdateCommand : IRequest<UserMasterDTO>
    {
        public UserMasterDTO userMasterDTO { get; set; }
    }

    internal class UserStatusUpdateHandler : IRequestHandler<UserStatusUpdateCommand, UserMasterDTO>
    {
        protected readonly IUserMaster _user;
        public UserStatusUpdateHandler(IUserMaster user)
        {
            _user = user;
        }

        public async Task<UserMasterDTO> Handle(UserStatusUpdateCommand request, CancellationToken cancellationToken)
        {
            return await _user.UserStatusUpdate(request.userMasterDTO);
        }

    }
}
