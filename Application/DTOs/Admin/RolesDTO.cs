using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Admin
{

    public class RolesDTO
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleCode { get; set; }
        public string RoleDesc { get; set; }
        public int IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int IsDeleted { get; set; }
        public int ActionUser { get; set; }

    }
    public class RolesList
    {
        public IEnumerable<RolesDTO> Roles { get; set; }
    }
}
