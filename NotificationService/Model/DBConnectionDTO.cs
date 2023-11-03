using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationService.Model
{
    public class DBConnectionDTO
    {
        public int DBConnId { get; set; }
        public string ConnName { get; set; }
        public string ServerName { get; set; }
        public string UserName { get; set; }
        public string Passwrd { get; set; }
        public string DBName { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int ActionUser { get; set; }
    }

    public class DBConnectionList
    {
        public IEnumerable<DBConnectionDTO> DBConnList { get; set; }
    }
}
