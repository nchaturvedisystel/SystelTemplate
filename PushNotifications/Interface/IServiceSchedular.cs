using System;
using PushNotification.Model;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PushNotification.Interface
{
    public interface IServiceSchedular
    {
        List<ServiceSchedularDTO> GetSchedulars();
        void CreateSchedular(ServiceSchedularDTO schedularDTO);
        void UpdateSchedular(ServiceSchedularDTO schedularDTO);
        void DeleteSchedular(int mappperId);
    }
}
