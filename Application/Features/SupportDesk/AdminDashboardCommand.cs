using Application.DTOs.SupportDesk;
using Application.Interfaces.SupportDesk;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.SupportDesk
{
    public class AdminDashboardCommand : IRequest<DashboardDTO>
    {
        public InputParams InputParams { get; set; }
    }
    internal class AdminDashboardCommandHandler : IRequestHandler<AdminDashboardCommand, DashboardDTO>
    {
        protected readonly ISupportDashboard _supportDashboard;
        public AdminDashboardCommandHandler(ISupportDashboard supportDashboard)
        {
            _supportDashboard = supportDashboard;
        }
        public async Task<DashboardDTO> Handle(AdminDashboardCommand request, CancellationToken cancellationToken)
        {
            return await _supportDashboard.GetAdminDashboardData(request.InputParams);
        }
    }
}
