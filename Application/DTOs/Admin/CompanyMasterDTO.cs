using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Admin
{
    public class CompanyMasterDTO
    {
        public int CompanyId { get; set; }
        public string CName { get; set; }
        public string CCode { get; set; }
        public string CDesc { get; set; }
        public string CAddress { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string ContactPerson { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public string CType { get; set; }
        public string ActionUser { get; set; }
    }

    public class CompanyList
    {
        public IEnumerable<CompanyMasterDTO> Companies { get; set; }
    }
}
