using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class UserDTO
    {
        public int UserId { get; set; }
        [Required(ErrorMessage = "FirstName required.")]
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        [Required(ErrorMessage = "LastName required.")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "DOB required.")]
        public DateTime DOB { get; set; }
        [Required(ErrorMessage = "Email required.")]
        public string EmailId { get; set; }
        [Required(ErrorMessage = "Phone required.")]
        public string MobileNo { get; set; }
        public string Designation { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int ResponseCode { get; set; }
        public string ResponseDescription { get; set; }
        public int ActionUser { get; set; }
        public string RoleId { get; set; }
        public string CompanyId { get; set; }
        public string DefaultCompanyId { get; set; }
    }

}
