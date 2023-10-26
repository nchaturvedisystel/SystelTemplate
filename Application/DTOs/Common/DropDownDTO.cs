using Application.DTOs.SupportDesk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Common
{
    public class DropDownDTO
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
    public class DropDownList
    {
        public IEnumerable<DropDownDTO> dropDownList { get; set; }
    }
}
