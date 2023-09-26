using Application.DTOs;
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
    public class UserCRUDCommand : IRequest<UserList>
    {
        public UserMasterDTO userMasterDTO { get; set; }
    }

    internal class UserHandler : IRequestHandler<UserCRUDCommand, UserList>
    {
        protected readonly IUserMaster _user;
        public UserHandler(IUserMaster user) 
        {
            _user = user;
        }

        public async Task<UserList> Handle(UserCRUDCommand request,CancellationToken cancellationToken) 
        {
            return await _user.UserCRUD(request.userMasterDTO);
        }

    }
}
