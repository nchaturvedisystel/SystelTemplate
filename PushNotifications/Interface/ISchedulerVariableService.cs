using PushNotification.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PushNotification.Interface
{
    public interface IAlertsServiceVariablesService
    {
        void CreateAlertsServiceVariable(AlertsServiceVariablesDTO alertsServiceVariable);
        void UpdateAlertsServiceVariable(AlertsServiceVariablesDTO alertsServiceVariable);
        AlertsServiceVariablesDTO GetAlertsServiceVariable(int variableId);

    }
}
