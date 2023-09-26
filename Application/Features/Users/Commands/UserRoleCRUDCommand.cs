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
    public class UserRoleCRUDCommand : IRequest<UserRoleList>
    {
        public UserRoleDTO userRoleDTO { get; set; }
    }

    internal class UserRoleHandler : IRequestHandler<UserRoleCRUDCommand, UserRoleList>
    {
        protected readonly IUserMaster _userRole;
        public UserRoleHandler(IUserMaster userRole)
        {
            _userRole = userRole;
        }

        public async Task<UserRoleList> Handle(UserRoleCRUDCommand request, CancellationToken cancellationToken)
        {
            return await _userRole.UserRoleCRUD(request.userRoleDTO);
        }
    }
}
