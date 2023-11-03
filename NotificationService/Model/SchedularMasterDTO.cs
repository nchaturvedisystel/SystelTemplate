using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationService.Model
{
    public class SchedularMasterDTO
    {
        public int SchedularId { get; set; }
        public string IName { get; set; }
        public string ICode { get; set; }
        public string IDesc { get; set; }
        public int FrequencyInMin { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int ActionUser { get; set; }
    }
    public class SchedularMasterList
    {
        public IEnumerable<SchedularMasterDTO> SchedularmasterList { get; set; }
    }
}
