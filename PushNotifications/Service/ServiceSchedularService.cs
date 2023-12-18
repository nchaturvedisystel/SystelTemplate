using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PushNotification.Interface;
using PushNotification.Model;

namespace PushNotification.Service
{
    public class ServiceSchedularService: IServiceSchedular
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;

        public List<ServiceSchedularDTO> GetSchedulars()
        {
            List<ServiceSchedularDTO> schedulars = new List<ServiceSchedularDTO>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand cmd = new SqlCommand("SELECT * FROM AlertsServiceSchedular WHERE IsDeleted <> 1", connection))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Map data from the database to ServiceSchedularDTO objects and add to the list
                            schedulars.Add(new ServiceSchedularDTO
                            {
                                MappperId = (int)reader["MappperId"],
                                ServiceId = (int)reader["ServiceId"],
                                SchedularId = (int)reader["SchedularId"],
                                LastExecutionTime = (DateTime)reader["LastExecutionTime"],
                                NextExecutionTime = (DateTime)reader["NextExecutionTime"],
                                StartsFrom = (DateTime)reader["StartsFrom"],
                                EndsOn = (DateTime)reader["EndsOn"],
                                DailyStartOn = (DateTime)reader["DailyStartOn"],
                                DailyEndsOn = (DateTime)reader["DailyEndsOn"],
                                IsActive = (int)reader["IsActive"],
                                IsDeleted = (int)reader["IsDeleted"],
                                ActionUser = (int)reader["ActionUser"]
                            });
                        }
                    }
                }
            }
            return schedulars;
        }

        public void CreateSchedular(ServiceSchedularDTO schedularDTO)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("AlertsServiceSchedular_CRUD", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    // Set command parameters based on the schedularDTO object
                    command.Parameters.Add(new SqlParameter("@ServiceId", SqlDbType.Int)).Value = schedularDTO.ServiceId;
                    command.Parameters.Add(new SqlParameter("@SchedularId", SqlDbType.Int)).Value = schedularDTO.SchedularId;
                    command.Parameters.Add(new SqlParameter("@LastExecutionTime", SqlDbType.DateTime)).Value = schedularDTO.LastExecutionTime;
                    command.Parameters.Add(new SqlParameter("@NextExecutionTime", SqlDbType.DateTime)).Value = schedularDTO.NextExecutionTime;
                    command.Parameters.Add(new SqlParameter("@StartsFrom", SqlDbType.DateTime)).Value = schedularDTO.StartsFrom;
                    command.Parameters.Add(new SqlParameter("@EndsOn", SqlDbType.DateTime)).Value = schedularDTO.EndsOn;
                    command.Parameters.Add(new SqlParameter("@DailyStartOn", SqlDbType.VarChar, 100)).Value = schedularDTO.DailyStartOn;
                    command.Parameters.Add(new SqlParameter("@DailyEndsOn", SqlDbType.VarChar, 100)).Value = schedularDTO.DailyEndsOn;
                    command.Parameters.Add(new SqlParameter("@IsActive", SqlDbType.Int)).Value = schedularDTO.IsActive;
                    command.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Int)).Value = schedularDTO.IsDeleted;
                    command.Parameters.Add(new SqlParameter("@ActionUser", SqlDbType.Int)).Value = schedularDTO.ActionUser;
                    command.ExecuteNonQuery();
                }
            }
        }

        public void UpdateSchedular(ServiceSchedularDTO schedularDTO)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("AlertsServiceSchedular_CRUD", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@MappperId", SqlDbType.Int)).Value = schedularDTO.MappperId;
                    command.Parameters.Add(new SqlParameter("@ServiceId", SqlDbType.Int)).Value = schedularDTO.ServiceId;
                    command.Parameters.Add(new SqlParameter("@SchedularId", SqlDbType.Int)).Value = schedularDTO.SchedularId;
                    command.Parameters.Add(new SqlParameter("@LastExecutionTime", SqlDbType.DateTime)).Value = schedularDTO.LastExecutionTime;
                    command.Parameters.Add(new SqlParameter("@NextExecutionTime", SqlDbType.DateTime)).Value = schedularDTO.NextExecutionTime;
                    command.Parameters.Add(new SqlParameter("@StartsFrom", SqlDbType.DateTime)).Value = schedularDTO.StartsFrom;
                    command.Parameters.Add(new SqlParameter("@EndsOn", SqlDbType.DateTime)).Value = schedularDTO.EndsOn;
                    command.Parameters.Add(new SqlParameter("@DailyStartOn", SqlDbType.VarChar, 100)).Value = schedularDTO.DailyStartOn;
                    command.Parameters.Add(new SqlParameter("@DailyEndsOn", SqlDbType.VarChar, 100)).Value = schedularDTO.DailyEndsOn;
                    command.Parameters.Add(new SqlParameter("@IsActive", SqlDbType.Int)).Value = schedularDTO.IsActive;
                    command.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Int)).Value = schedularDTO.IsDeleted;
                    command.Parameters.Add(new SqlParameter("@ActionUser", SqlDbType.Int)).Value = schedularDTO.ActionUser;
                    command.ExecuteNonQuery();
                }
            }
        }

        public void DeleteSchedular(int mappperId)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("AlertsServiceSchedular_CRUD", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@MappperId", SqlDbType.Int)).Value = mappperId;
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}
