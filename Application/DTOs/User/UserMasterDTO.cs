using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.User
{
    public class UserMasterDTO
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string Designation { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int ActionUser { get; set; }
        public string ProfileImage { get; set; } 
        public int ActiveUserId { get; set; }
        public string WebRootPath { get; set; }
        public string ProfileImageBase64 { get; set; }
        public string Username { get; set; }
        public string AssignedWC { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set;}
        public string RoleName { get; set;}
    }

    public class UserList
    {
        public IEnumerable<UserMasterDTO> Users { get; set; }
    }
    public class UserCredDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public int ActionUser { get; set; }
    }
}
