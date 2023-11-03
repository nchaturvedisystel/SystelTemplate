using NotificationService.Common;
using NotificationService.Interface;
using NotificationService.Model;
using NotificationService.Service;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationService.BAL
{
    public class NotificationMaster
    {
        protected readonly EncryptDecryptService encryptDecryptService = new EncryptDecryptService();
        private readonly INotificationMaster notificationMaster = new NotificationMasterService();
        private readonly IPushNotification pushNotification = new PushNotificationService();
        private CrystalReportServ crystalReportServ = new CrystalReportServ();
        protected readonly Logging logging = new Logging();
        public NotificationMaster()
        {
        }

        public void ExecutionServicemaster()
        {
            try
            {
                logging.LogInfo("Fetching List of Services to be executed");
                ServiceMasterList serviceMasterList = new ServiceMasterList();
                serviceMasterList = notificationMaster.GetExecutionServicemaster();
                logging.LogInfo("No of services to be executed = " + serviceMasterList.ServicemasterList.Count().ToString());

                foreach (ServiceMasterDTO serviceMasterDTO in serviceMasterList.ServicemasterList)
                {
                    serviceMasterDTO.Passwrd = encryptDecryptService.DecryptValue(serviceMasterDTO.Passwrd);
                    DataTable serviceDataTable = GetServiceData(serviceMasterDTO);
                    logging.LogInfo("Notification data found for record(s) = " + serviceDataTable.Rows.Count.ToString());

                    if (serviceDataTable.Rows.Count > 0)
                    {
                        Dictionary<string, dynamic> keyValuePairs = GetServiceVariables(serviceMasterDTO);
                        logging.LogInfo($"Service({serviceMasterDTO.Title}) variable count = " + keyValuePairs.Count.ToString());

                        if (serviceMasterDTO.AlertType == "Email")
                        {
                            GenerateEmailSchedularData(serviceMasterDTO, serviceDataTable, keyValuePairs);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                logging.LogError("NotificationService.BAL.NotificationMaster/ExecutionServicemaster : " + ex.Message);
            }
        }

        public DataTable GetServiceData(ServiceMasterDTO serviceMasterDTO)
        {
            DataSet ServiceDataSet = new DataSet();
            try
            {
                if (serviceMasterDTO.DataSourceType == "Query")
                {
                    string DBConnString = $"Data Source={serviceMasterDTO.ServerName};Initial Catalog={serviceMasterDTO.DBName};Persist Security Info=True;User ID={serviceMasterDTO.UserName};Password={serviceMasterDTO.Passwrd}";
                    ServiceDataSet = notificationMaster.GetServiceMasterDataByQuery(DBConnString, serviceMasterDTO.DataSourceDef);
                }

            }
            catch (Exception ex)
            {
                logging.LogError("NotificationService.BAL.NotificationMaster/GetServiceData : " + ex.Message);
            }
            return ServiceDataSet.Tables[0];
        }
        public Dictionary<string, dynamic> GetServiceVariables(ServiceMasterDTO serviceMasterDTO)
        {
            Dictionary<string, dynamic> keyValuePairs = new Dictionary<string, dynamic>();
            try
            {

                if (!string.IsNullOrEmpty(serviceMasterDTO.ServiceVariables))
                {
                    string[] variablesList = serviceMasterDTO.ServiceVariables.Split(',');
                    foreach (string variable in variablesList)
                    {
                        string[] VariableKV = variable.Split(':');
                        dynamic KeyValue;
                        if (VariableKV[2] == "INT")
                        {
                            KeyValue = Convert.ToInt32(VariableKV[1]);
                        }
                        else
                        {
                            KeyValue = VariableKV[1];
                        }
                        keyValuePairs.Add(VariableKV[0].Trim(), KeyValue);
                    }
                }
            }
            catch (Exception ex)
            {
                logging.LogError("NotificationService.BAL.NotificationMaster/GetServiceVariables : " + ex.Message);
            }
            return keyValuePairs;
        }
        public void GenerateEmailSchedularData(ServiceMasterDTO serviceMasterDTO, DataTable dataTable, Dictionary<string, dynamic> keyValuePairs)
        {
            try
            {
                PushNotification pushNotificationBAL = new PushNotification();
                DataTable typNotificationMaster = pushNotificationBAL.AddPushNotificationColumns();

                foreach (DataRow row in dataTable.Rows)
                {
                    DataRow newRow = typNotificationMaster.NewRow();
                    newRow["NType"] = "Email";
                    newRow["NSubject"] = ReplaceVariables(serviceMasterDTO.ASubject, row, keyValuePairs);
                    newRow["NContent"] = ReplaceVariables(serviceMasterDTO.ABody, row, keyValuePairs);
                    newRow["NTo"] = ReplaceVariables(serviceMasterDTO.EmailTo, row, keyValuePairs);
                    newRow["NCc"] = ReplaceVariables(serviceMasterDTO.CCTo, row, keyValuePairs);
                    newRow["NBcc"] = ReplaceVariables(serviceMasterDTO.BccTo, row, keyValuePairs);
                    newRow["IsDeleted"] = 0;
                    newRow["NStatus"] = "Pending";
                    newRow["Remarks"] = "";
                    newRow["ScheduledDate"] = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
                    newRow["AttachmentPath"] = "";
                    newRow["RetryCount"] = 0;
                    newRow["CreatedBy"] = "Not. Service";
                    newRow["PostSendDataSourceType"] = serviceMasterDTO.PostSendDataSourceType;
                    newRow["PostSendDataSourceDef"] = ReplaceVariables(serviceMasterDTO.PostSendDataSourceDef, row, keyValuePairs);
                    newRow["DBConnId"] = serviceMasterDTO.DBConnId;

                    serviceMasterDTO.OutputFileName = ReplaceVariables(serviceMasterDTO.OutputFileName, row, keyValuePairs);
                    if (serviceMasterDTO.HasAttachment == 1)
                    {
                        if (serviceMasterDTO.AttachmentType.Trim() == "CrystalReport")
                        {
                            logging.LogInfo("Notification Attachment Type is  CrystalReport");
                            newRow["AttachmentPath"] = GenerateAttachmentGetPath(serviceMasterDTO, row[0].ToString());
                        }
                    }
                    typNotificationMaster.Rows.Add(newRow);
                }
                //Insert into Push Notification
                pushNotification.InsertPushNotifications(typNotificationMaster);
            }
            catch (Exception ex)
            {
                logging.LogError("NotificationService.BAL.NotificationMaster/GenerateEmailSchedularData : " + ex.Message);
            }
        }

        public string ReplaceVariables(string Content, DataRow row, Dictionary<string, dynamic> keyValuePairs)
        {
            try
            {
                foreach (KeyValuePair<string, dynamic> keyValue in keyValuePairs)
                {
                    string oldValue = keyValue.Key;
                    string newValue = row[keyValue.Value].ToString();
                    Content = Content.Replace(oldValue, newValue);
                }
            }
            catch (Exception ex)
            {
                logging.LogError("NotificationService.BAL.NotificationMaster/ReplaceVariables : " + ex.Message);
                throw ex;
            }
            return Content;
        }
        public string GenerateAttachmentGetPath(ServiceMasterDTO serviceMasterDTO, string reportInputParameter)
        {
            string AttachmentPath = "";
            try
            {
                if (serviceMasterDTO.AttachmentFileType == "PDF")
                {
                    logging.LogInfo("Notification Attachment Type is  PDF");

                    //AttachmentPath =  GenratePdfFromCrystalReport(serviceMasterDTO);
                    Dictionary<string, dynamic> keyValuePairs = new Dictionary<string, dynamic>();
                    keyValuePairs.Add("@DocKey", reportInputParameter);
                    AttachmentPath = GetAttachmentSavePath(serviceMasterDTO);
                    crystalReportServ.GeneratePDFReport(serviceMasterDTO.AttachmentPath, AttachmentPath, keyValuePairs, serviceMasterDTO.ServerName, serviceMasterDTO.UserName, serviceMasterDTO.Passwrd, serviceMasterDTO.DBName);
                }
            }
            catch (Exception ex)
            {
                logging.LogError("NotificationService.BAL.NotificationMaster/GenerateAttachmentGetPath : " + ex.Message);
                throw ex;
            }
            return AttachmentPath;
        }
        public string GetAttachmentSavePath(ServiceMasterDTO serviceMasterDTO)
        {
            string attachmentPath = "";
            try
            {
                if (string.IsNullOrEmpty(serviceMasterDTO.OutputFileName))
                {
                    if (serviceMasterDTO.AttachmentFileType == "PDF")
                    {
                        attachmentPath = ConfigurationManager.AppSettings["ServiceDocPath"] + @"\" + RandomString(Convert.ToInt32(ConfigurationManager.AppSettings["RandomStringLength"])) + ".pdf";
                    }
                }
                else
                {
                    attachmentPath = ConfigurationManager.AppSettings["ServiceDocPath"] + @"\" + serviceMasterDTO.OutputFileName;
                }
                DeleteFileIfExists(attachmentPath);
            }
            catch (Exception ex)
            {
                logging.LogError("NotificationService.BAL.NotificationMaster/GetAttachmentSavePath : " + ex.Message);
                throw ex;
            }
            return attachmentPath;
        }
        public static string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public void DeleteFileIfExists(string filePath)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }
    }
}
