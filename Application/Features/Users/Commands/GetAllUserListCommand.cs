using Application.DTOs.Admin;
using Application.DTOs.Common;
using Application.Features.Admin.Commands;
using Application.Interfaces.Admin;
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
    public class GetAllUserListCommand : IRequest<DropDownList>
    {
    }
    internal class GetAllUserListCommandHandler : IRequestHandler<GetAllUserListCommand, DropDownList>
    {
        protected readonly IUserMaster _userMaster;

        public GetAllUserListCommandHandler(IUserMaster userMaster)
        {
            _userMaster = userMaster;
        }
        public async Task<DropDownList> Handle(GetAllUserListCommand request, CancellationToken cancellationToken)
        {
            return await _userMaster.GetAllUserList();
        }
    }
}
