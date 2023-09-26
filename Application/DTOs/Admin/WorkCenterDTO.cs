using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Admin
{
    public class WorkCenterDTO
    {
        public int WorkCenterId { get; set; }
        public string WorkCenterName { get; set; }
        public string WorkCenterCode { get; set; }
        public string WorkCenterDesc { get; set; }
        public int DisplaySeq { get; set; }
        public int IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int IsDeleted { get; set; }
        public int ActionUser { get; set; }
    }
    public class WorkCenterList
    {
        public IEnumerable<WorkCenterDTO> Items { get; set; }
    }
}
