using Application.DTOs.Admin;
using Application.DTOs.User;
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
    public class AdminDashboardCommand : IRequest<AdminDashboardList>
    {
        public int ActionUser { get; set; }
    }
    internal class AdminDashboardHandler : IRequestHandler<AdminDashboardCommand, AdminDashboardList> 
    {
        protected readonly IMenuManage _user;

        public AdminDashboardHandler(IMenuManage user)
        {
            _user = user;
        }

        public async Task<AdminDashboardList> Handle(AdminDashboardCommand request, CancellationToken cancellationToken)
        {
            return await _user.AdminDashboardGet(request.ActionUser);
        }

    }
}
