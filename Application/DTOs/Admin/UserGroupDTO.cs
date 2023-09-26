using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Admin
{
    /// <summary>
    /// This Model Represents Details of User Groups
    /// </summary>
    public class UserGroupDTO
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string GroupCode { get; set; }
        public string GroupDesc { get; set; }
        public int IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int IsDeleted { get; set; }
        public int ActionUser { get; set; }

    }
    public class UserGroupList
    {
        public IEnumerable<UserGroupDTO> Groups { get; set; }
    }
}
