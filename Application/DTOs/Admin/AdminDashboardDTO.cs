using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Admin
{
    public class DashboardHeaderDTO
    {
        public int ProblemsReported { get; set; }
        public int Resolved { get; set; }
        public TimeSpan ETATime { get; set; }
        public int ActiveTravelers { get; set; }
        public int ActiveWorkOrders { get; set; }
        public float AverageDelay { get; set; }

    }

    public class WorkCenterForDashboardDTO
    {
        public int WorkcenterId { get; set; }
        public string WorkCenterCode { get; set; }
        public int Completed { get; set; }
        public int InProgress { get; set; }
        public int NotStarted { get; set; }
    }

    public class UserPerformanceForDashboardDTO
    {
        public string FirstName { get; set; }
        public int ProgressCount { get; set; }
    }

    public class ActivePagesForDashboardDTO
    {
        public string PageCode { get; set; }
        public int TotalDuration { get; set; }
    }

    public class RoleDetailsForDashboardDTO
    {
        public string RoleCode { get; set; }
        public int Utilized { get; set; }
    }

    public class AdminDashboardList
    {
        public IEnumerable<DashboardHeaderDTO> DashboardList { get; set; }
        public IEnumerable<WorkCenterForDashboardDTO> WorkCenterList { get; set; }
        public IEnumerable<UserPerformanceForDashboardDTO> PerformanceList { get; set; }
        public IEnumerable<ActivePagesForDashboardDTO> ActivePagesList { get; set; }
        public IEnumerable<RoleDetailsForDashboardDTO> ActiveRolesList { get; set; }
    }
}
