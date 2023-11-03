using NotificationService.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationService.Interface
{
    public interface INotificationMaster
    {
        ServiceMasterList GetExecutionServicemaster();
        DataSet GetServiceMasterDataByQuery(string connectionString, string queryString);
    }
}
