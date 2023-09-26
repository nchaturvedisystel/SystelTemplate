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
    public class UserDashboardCommand : IRequest<UserDashboardList>
    {
        public UserDashboardDTO userDashboardDTO { get; set; }
    }
    internal class UserDashboardHandler : IRequestHandler<UserDashboardCommand, UserDashboardList> 
    {
        protected readonly IUserMaster _user;

        public UserDashboardHandler(IUserMaster user)
        {
            _user = user;
        }

        public async Task<UserDashboardList> Handle(UserDashboardCommand request, CancellationToken cancellationToken)
        {
            return await _user.UserDashboardGet(request.userDashboardDTO);
        }
    }
}
