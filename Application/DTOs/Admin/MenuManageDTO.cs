using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Admin
{
    public class MenuManageDTO
    {
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public string MenuCode { get; set; }
        public string MenuDesc { get; set; }
        public int DisplayOrder { get; set; }
        public int ParentMenuId { get; set; }
        public int DefaultChildMenuId { get; set; }
        public string MenuIconUrl { get; set; }
        public string TemplatePath { get; set; }
        public int IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int IsDeleted { get; set; }
        public int ActionUser { get; set; }
    }
    public class MenuManageList
    {
        public IEnumerable<MenuManageDTO> Menus { get; set; }
    }

}
