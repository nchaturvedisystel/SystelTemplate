using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.User
{
    public class UserWorkCenterDTO
    {
        public string WorkCenterName { get; set; }
        public int UserWorkCenterId { get; set; }
        public int UserId { get; set; }
        public int WorkCenterId { get; set; }
        public int IsActive { get; set; }
        public int ActionUser { get; set; }
        public int IsDeleted { get; set; }

    }

    public class UserWorkCenterList
    {
        public IEnumerable<UserWorkCenterDTO> UserWorkCenter { get; set; }
    }
}
