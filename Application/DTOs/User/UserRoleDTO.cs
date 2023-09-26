using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.User
{
    public class UserRoleDTO
    {
        public string RoleName { get; set; }
        public int UserRoleId { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int IsActive { get; set; }
        public int ActionUser { get; set; }
        public int IsDeleted { get; set; }
    }

    public class UserRoleList
    {
        public IEnumerable<UserRoleDTO> UserRole { get; set; }
    }
}
