using Application.DTOs.Admin;
using Application.Interfaces.Admin;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Admin.Commands
{
    public class UserGroupCRUDCommand : IRequest<UserGroupList>
    {
        public UserGroupDTO userGroupDTO { get; set; }
    }
    internal class UserGroupHandler : IRequestHandler<UserGroupCRUDCommand, UserGroupList>
    {
        protected readonly IUserGroup _userGroup;

        public UserGroupHandler(IUserGroup userGroup)
        {
           _userGroup = userGroup;
        }
        public async Task<UserGroupList> Handle(UserGroupCRUDCommand request, CancellationToken cancellationToken)
        {
            return await _userGroup.ManageUserGroup(request.userGroupDTO);
        }
    }
}
