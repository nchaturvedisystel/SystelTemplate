using PushNotification.Interface;
using PushNotification.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PushNotification.Service
{
    public class AlertsServiceVariablesService : IAlertsServiceVariablesService
    {
        private string ConnectionString => ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;

        public void CreateAlertsServiceVariable(AlertsServiceVariablesDTO alertsServiceVariable)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("AlertsServiceVariables_CRUD", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    // Set parameters from the alertsServiceVariable DTO
                    command.Parameters.AddWithValue("@ServiceId", alertsServiceVariable.ServiceId);
                    command.Parameters.AddWithValue("@VarInstance", alertsServiceVariable.VarInstance);
                    command.Parameters.AddWithValue("@VarValue", alertsServiceVariable.VarValue);
                    command.Parameters.AddWithValue("@VarType", alertsServiceVariable.VarType);
                    command.Parameters.AddWithValue("@IsActive", alertsServiceVariable.IsActive);
                    command.Parameters.AddWithValue("@IsDeleted", alertsServiceVariable.IsDeleted);
                    command.Parameters.AddWithValue("@ActionUser", alertsServiceVariable.ActionUser);

                    // Execute the stored procedure
                    command.ExecuteNonQuery();
                }
            }
        }

        public void UpdateAlertsServiceVariable(AlertsServiceVariablesDTO alertsServiceVariable)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("AlertsServiceVariables_CRUD", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    // Set parameters from the alertsServiceVariable DTO
                    command.Parameters.AddWithValue("@VariableId", alertsServiceVariable.VariableId);
                    command.Parameters.AddWithValue("@ServiceId", alertsServiceVariable.ServiceId);
                    command.Parameters.AddWithValue("@VarInstance", alertsServiceVariable.VarInstance);
                    command.Parameters.AddWithValue("@VarValue", alertsServiceVariable.VarValue);
                    command.Parameters.AddWithValue("@VarType", alertsServiceVariable.VarType);
                    command.Parameters.AddWithValue("@IsActive", alertsServiceVariable.IsActive);
                    command.Parameters.AddWithValue("@IsDeleted", alertsServiceVariable.IsDeleted);
                    command.Parameters.AddWithValue("@ActionUser", alertsServiceVariable.ActionUser);

                    // Execute the stored procedure
                    command.ExecuteNonQuery();
                }
            }
        }

        public AlertsServiceVariablesDTO GetAlertsServiceVariable(int variableId)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("AlertsServiceVariables_CRUD", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@VariableId", variableId);


                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new AlertsServiceVariablesDTO
                            {
                                VariableId = (int)reader["VariableId"],
                                ServiceId = (int)reader["ServiceId"],
                                VarInstance = reader["VarInstance"].ToString(),
                                VarValue = reader["VarValue"].ToString(),
                                VarType = reader["VarType"].ToString(),
                                IsActive = (int)reader["IsActive"],
                                IsDeleted = (int)reader["IsDeleted"],
                                ActionUser = (int)reader["ActionUser"]
                            };
                        }
                    }
                }
            }
            return null;
        }
    }
}