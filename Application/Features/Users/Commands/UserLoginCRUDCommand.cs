using Application.DTOs;
using Application.DTOs.User;
using Application.Features.Menus.Commands;
using Application.Interfaces.User;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Users.Commands
{
    public class UserLoginCRUDCommand : IRequest<UserList>
    {
        public UserCredDTO UserCredDTO { get; set; }
    }

    internal class UserLoginCRUDHandler : IRequestHandler<UserLoginCRUDCommand, UserList>
    {
        private readonly IUserMaster _user;

        public UserLoginCRUDHandler(IUserMaster user)
        {
            _user = user;
        }

        public async Task<UserList> Handle(UserLoginCRUDCommand request, CancellationToken cancellationToken)
        {
            return await _user.CreateUserCredentials(request.UserCredDTO);
        }
    }

}
