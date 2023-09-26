using Application.DTOs.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Common
{
    public interface IUserTimeTracking
    {
        public Task<UserTimeTrackingDTOList> UserTimeTracking (UserTimeTrackingDTO userTimeTrackingDTO);
        public Task<DashboardList> DashboardGet(int actionUser);
    }
}
