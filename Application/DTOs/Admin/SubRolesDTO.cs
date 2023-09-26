using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Admin
{
    public class SubRolesDTO
    {
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public string MenuCode { get; set; }
        public string MenuDesc { get; set; }
        public int ParentMenuId { get; set; }
        public int RoleId { get; set; }
        public int DisplayOrder { get; set; }
        public int SubRoleId { get; set; }
        public Boolean HasAccess { get; set; }
        public int ActionUser { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }

    }

    public class SubRolesList
    {
        public IEnumerable<SubRolesDTO> SubRoles { get; set; }
    }
}
