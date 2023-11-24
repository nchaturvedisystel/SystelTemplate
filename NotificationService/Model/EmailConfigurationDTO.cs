using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationService.Model
{
    public class EmailConfigurationDTO
    {
        public int EmailConfigId { get; set; }
        public string IName { get; set; }
        public string IDesc { get; set; }
        public string IPort { get; set; }
        public string IHost { get; set; }
        public string IFrom { get; set; }
        public string IPassword { get; set; }
        public bool IEnableSsl { get; set; }
        public bool IsBodyHtml { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int ActionUser { get; set; }

    }
    public class EmailConfigurationList
    {
        public IEnumerable<EmailConfigurationDTO> EmailConfigList { get; set; }
    }
}
