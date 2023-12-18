using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PushNotification.Interface;
using PushNotification.Model;
using System.Data.SqlClient;
using System.Data;

namespace PushNotification.Service
{
    public class SchedularService : ISchedularConfig
    {
        public void CreateSchedular(SchedularConfigDTO schedularDTO)
        {
            string ConnectionService = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
            SqlConnection connection = new SqlConnection(ConnectionService);
            {
                connection.Open();
                SqlCommand SPCommand = new SqlCommand("AlertsSchedular_CRUD", connection);
                SPCommand.CommandType = CommandType.StoredProcedure;
                {
                    SPCommand.Parameters.AddWithValue("@IName", schedularDTO.SchedularName);
                    SPCommand.Parameters.AddWithValue("@ICode", schedularDTO.SchedularCode);
                    SPCommand.Parameters.AddWithValue("@IDesc", schedularDTO.SchedularDesc);
                    SPCommand.Parameters.AddWithValue("@SchedularType", schedularDTO.SchedularType);
                    SPCommand.Parameters.AddWithValue("@FrequencyInMinutes", schedularDTO.FrequencyInMins);
                    SPCommand.Parameters.AddWithValue("@IsActive", 0);
                    SPCommand.Parameters.AddWithValue("@IsDeleted", 0);
                    SPCommand.Parameters.AddWithValue("@ActionUser", 0);
                    SPCommand.ExecuteNonQuery();
                }
                MessageBox.Show("Data Saved");
            }
        }
    }
}
