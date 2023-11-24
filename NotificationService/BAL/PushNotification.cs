using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using NotificationService.Common;
using NotificationService.Model;
using NotificationService.Service;
using NotificationService.Interface;
using System.IO;

namespace NotificationService.BAL
{
    public class PushNotification
    {
        protected readonly EncryptDecryptService encryptDecryptService = new EncryptDecryptService();
        private EmailConfigurationList _emailConfig;

        private readonly IPushNotification pushNotification = new PushNotificationService();
        private readonly INotificationMaster notificationMaster = new NotificationMasterService();
        private readonly IEmailConfiguration emailConfiguration = new EmailConfigurationService();
        protected readonly Logging logging = new Logging();
        public PushNotification()
        {

        }


        public void ProcessNotification()
        {
            try
            {
                //EncryptDecryptService encryptDecryptService = new EncryptDecryptService();
                //string EncPwd = encryptDecryptService.EncryptValue("wpuk oulb fbck cowl");

                //Get configuration details to send respective type of notification

                logging.LogInfo("Systel.Notification.BAL.PushNotification/ProcessNotification : Get configuration details to send respective type of notification Start");
                GetConfiguration();

                //Get Notification List
                logging.LogInfo("Systel.Notification.BAL.PushNotification/ProcessNotification : Get Notification List Start");
                PushNotificationList pushNotificationList = new PushNotificationList();
                pushNotificationList = GetNotificationList(pushNotificationList);
                logging.LogInfo("Systel.Notification.BAL.PushNotification/ProcessNotification : No Of Notifications" + pushNotificationList.NotificationList.Count().ToString());

                //Send Notifications
                logging.LogInfo("Systel.Notification.BAL.PushNotification/ProcessNotification : Send Notification Start");
                pushNotificationList = SendNotification(pushNotificationList);

                //Update Notification Status
                logging.LogInfo("Systel.Notification.BAL.PushNotification/ProcessNotification : Update Notification Status in DB Start");
                UpdatePushNotifications(pushNotificationList);
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.BAL.PushNotification/ProcessNotification : " + ex.Message);
                throw ex;
            }

        }
        public void GetConfiguration()
        {
            try
            {
                EncryptDecryptService encryptDecryptService = new EncryptDecryptService();

                //Get Email Configuration 
                //IEmailConfiguration emailConfiguration = new EmailConfigurationService(,options);
                _emailConfig = emailConfiguration.GetEmailConfigDetails();

                foreach (EmailConfigurationDTO emailConfigurationDTO in _emailConfig.EmailConfigList)
                {
                    emailConfigurationDTO.IPassword = encryptDecryptService.DecryptValue(emailConfigurationDTO.IPassword);
                }
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.BAL.PushNotification/GetConfiguration : " + ex.Message);
                throw ex;
            }

        }
        public PushNotificationList GetNotificationList(PushNotificationList pushNotificationList)
        {
            try
            {
                pushNotificationList = pushNotification.GetPushNotifications();
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.BAL.PushNotification/GetNotificationList : " + ex.Message);
                throw ex;
            }
            return pushNotificationList;
        }
        public PushNotificationList SendNotification(PushNotificationList pushNotificationList)
        {
            try
            {
                EmailConfigurationDTO emailConfigurationDTO = new EmailConfigurationDTO();
                emailConfigurationDTO = _emailConfig.EmailConfigList.FirstOrDefault();

                foreach (PushNotificationDTO item in pushNotificationList.NotificationList)
                {
                    item.Passwrd = encryptDecryptService.DecryptValue(item.Passwrd);
                    SendEmail(item, emailConfigurationDTO);
                    RunPostSendAction(item);
                    DeleteAttachmentFile(item);
                }
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.BAL.PushNotification/SendNotification : " + ex.Message);
                throw ex;
            }
            return pushNotificationList;
        }
        public PushNotificationDTO SendEmail(PushNotificationDTO pushNotificationDTO, EmailConfigurationDTO emailConfigurationDTO)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(emailConfigurationDTO.IFrom);
                mailMessage.To.Add(pushNotificationDTO.NTo);
                mailMessage.Subject = pushNotificationDTO.NSubject;
                mailMessage.Body = pushNotificationDTO.NContent;

                if (File.Exists(pushNotificationDTO.AttachmentPath))
                {
                    mailMessage.Attachments.Add(new Attachment(pushNotificationDTO.AttachmentPath));

                    //Send Multiple files
                    //string[] FileName = new string[] { pushNotificationDTO.AttachmentPath, pushNotificationDTO.AttachmentPath };
                    //foreach (string File in FileName)
                    //{
                    //    Attachment atch = new Attachment(File);
                    //    mailMessage.Attachments.Add(atch);
                    //}
                }

                SmtpClient smtpClient = new SmtpClient();
                smtpClient.Host = emailConfigurationDTO.IHost;
                smtpClient.Port = Convert.ToInt32(emailConfigurationDTO.IPort);
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(emailConfigurationDTO.IFrom, emailConfigurationDTO.IPassword);
                smtpClient.EnableSsl = true;

                try
                {
                    smtpClient.Send(mailMessage);
                    pushNotificationDTO.NStatus = "Success";

                }
                catch (Exception ex)
                {
                    pushNotificationDTO.NStatus = "Failed";
                    pushNotificationDTO.Remarks = ex.Message;
                }
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.BAL.PushNotification/SendEmail : " + ex.Message);
                throw ex;
            }
            return pushNotificationDTO;
        }
        public void UpdatePushNotifications(PushNotificationList pushNotificationList)
        {
            try
            {
                DataTable typNotificationMaster = AddPushNotificationColumns();

                foreach (PushNotificationDTO pushNotificationDTO in pushNotificationList.NotificationList)
                {
                    DataRow newRow = typNotificationMaster.NewRow();
                    newRow["NotificationId"] = pushNotificationDTO.NotificationId;
                    newRow["NStatus"] = pushNotificationDTO.NStatus;
                    newRow["Remarks"] = pushNotificationDTO.Remarks;
                    typNotificationMaster.Rows.Add(newRow);
                }

                //IPushNotification pushNotification = new PushNotificationService();
                pushNotification.UpdatePushNotifications(typNotificationMaster);
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.BAL.PushNotification/UpdatePushNotifications : " + ex.Message);
                throw ex;
            }
        }
        public void RunPostSendAction(PushNotificationDTO pushNotificationDTO)
        {
            try
            {
                if (!string.IsNullOrEmpty(pushNotificationDTO.PostSendDataSourceDef))
                {
                    string DBConnString = $"Data Source={pushNotificationDTO.ServerName};Initial Catalog={pushNotificationDTO.DBName};Persist Security Info=True;User ID={pushNotificationDTO.UserName};Password={pushNotificationDTO.Passwrd}";
                    DataSet ds = notificationMaster.GetServiceMasterDataByQuery(DBConnString, pushNotificationDTO.PostSendDataSourceDef);
                }
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.BAL.PushNotification/RunPostSendAction : " + ex.Message);
                throw ex;
            }
        }
        public void DeleteAttachmentFile(PushNotificationDTO pushNotificationDTO)
        {
            try
            {
                if (!string.IsNullOrEmpty(pushNotificationDTO.AttachmentPath))
                {
                    if (File.Exists(pushNotificationDTO.AttachmentPath))
                    {
                        File.Delete(pushNotificationDTO.AttachmentPath);
                    }
                }
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.BAL.PushNotification/DeleteAttachmentFile : " + ex.Message);
                throw ex;
            }
        }
        public DataTable AddPushNotificationColumns()
        {
            DataTable typNotificationMaster = new DataTable();
            try
            {
                typNotificationMaster.Clear();
                typNotificationMaster.Columns.Add("NotificationId");
                typNotificationMaster.Columns.Add("NType");
                typNotificationMaster.Columns.Add("NSubject");
                typNotificationMaster.Columns.Add("NContent");
                typNotificationMaster.Columns.Add("NTo");
                typNotificationMaster.Columns.Add("NCc");
                typNotificationMaster.Columns.Add("NBcc");
                typNotificationMaster.Columns.Add("IsDeleted");
                typNotificationMaster.Columns.Add("NStatus");
                typNotificationMaster.Columns.Add("Remarks");
                typNotificationMaster.Columns.Add("ScheduledDate");
                typNotificationMaster.Columns.Add("AttachmentPath");
                typNotificationMaster.Columns.Add("RetryCount");
                typNotificationMaster.Columns.Add("PostSendDataSourceType");
                typNotificationMaster.Columns.Add("PostSendDataSourceDef");
                typNotificationMaster.Columns.Add("DBConnId");
                typNotificationMaster.Columns.Add("CreatedBy");
            }
            catch (Exception ex)
            {
                logging.LogError("Systel.Notification.BAL.PushNotification/AddPushNotificationColumns : " + ex.Message);
                throw ex;
            }
            return typNotificationMaster;
        }
    }
}
