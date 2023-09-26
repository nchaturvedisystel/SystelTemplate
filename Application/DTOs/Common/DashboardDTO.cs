using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Common
{
    public class DashboardDTO
    {
        public string CurrentTask { get; set; }
        public int TotalActiveTask { get; set; }
        public int TaskCompleted { get; set; }
        public string AverageCompletedTask { get; set; }
        public string ETAforCurrentTask { get; set; }
                
    }

    public class WorkProgressDTO
    {
        public int WorkcenterId { get; set; }
        public string WorkCenterCode { get; set; }
        public int Completed { get; set; }
        public int InProgress { get; set; }
        public int NotStarted { get; set; }
        public string Remarks { get; set; }
    }

    public class TimeSpentWorkDTO
    {
        public int WorkcenterId { get; set; }
        public string WorkCenterCode { get; set; }
        public int Completed { get; set; }
        public int InProgress { get; set; }
        public int NotStarted { get; set; }
        public string Remarks { get; set; }
    }

    public class UpcomingWorkDTO
    {
        public int WorkcenterId { get; set; }
        public string WorkCenterCode { get; set; }
        public int Completed { get; set; }
        public int InProgress { get; set; }
        public int NotStarted { get; set; }
        public string Remarks { get; set; }
    }

    public class OngoingWorkDTO
    {
        public int WorkcenterId { get; set; }
        public string WorkCenterCode { get; set; }
        public int Completed { get; set; }
        public int InProgress { get; set; }
        public int NotStarted { get; set; }
        public string Remarks { get; set; }
    }

    public class DashboardList
    {
        public IEnumerable<DashboardDTO> DashList { get; set; }
        public IEnumerable<WorkProgressDTO> WorkProgressList { get; set; }
        public IEnumerable<TimeSpentWorkDTO> TimeSpentWorkList { get; set; }
        public IEnumerable<UpcomingWorkDTO> UpcomingWorkList { get; set; }
        public IEnumerable<OngoingWorkDTO> OngoingWorkList { get; set; }
    }
}
