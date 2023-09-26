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
    public  class DashboardCommand : IRequest<DashboardList>
    {
        public int ActionUser { get; set; }
    }
    internal class DashboardHandler : IRequestHandler<DashboardCommand, DashboardList>
    {
        protected readonly IUserTimeTracking _user;

        public DashboardHandler(IUserTimeTracking user)
        {
            _user = user;
        }
        public async Task<DashboardList> Handle(DashboardCommand request, CancellationToken cancellationToken)
        {
            return await _user.DashboardGet(request.ActionUser);
        }
    }
}
