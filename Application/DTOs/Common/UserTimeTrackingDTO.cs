using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Common
{
    public class UserTimeTrackingDTO
    {
        public string PageCode { get; set; }
        public int ActionUser { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Duration { get; set; }
        public DateTime LogTime { get; set; }

    }
    public class UserTimeTrackingDTOList
    {
        public IEnumerable<UserTimeTrackingDTO> List { get; set; }
    }
}
