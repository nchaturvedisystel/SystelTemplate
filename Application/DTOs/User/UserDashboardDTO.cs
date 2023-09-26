using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.User
{
    public class UserDashboardDTO
    {
        public string LabelName { get; set; }
        public string LabelValue { get; set; }
        public string LabelType { get; set; }
        public int ActionUser { get; set; }
    }
    public class UserDashboardList
    {
        public IEnumerable<UserDashboardDTO> UserDashboardDetails { get; set; }
    }
}
