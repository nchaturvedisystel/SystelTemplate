using System;
using System.Collections.Generic;
using System.Text;

namespace Application
{
    public class PagedResponse<T> : APIResponse<T>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public PagedResponse(T data, int pageNumber, int pageSize)
        {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            //this.data = data;
            //this.messages = null;
            //this.success = true;
        }
    }
}
