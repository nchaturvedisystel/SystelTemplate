using NotificationService.BAL;
using NotificationService.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace NotificationService
{
    public partial class Service1 : ServiceBase
    {
        protected readonly EncryptDecryptService encryptDecryptService = new EncryptDecryptService();
        protected readonly Logging logging = new Logging();
        Timer timer = new Timer(); // name space(using System.Timers;)
        public Service1()
        {
            //InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            logging.LogInfo("Service is started at " + DateTime.Now);
            timer.Elapsed += new ElapsedEventHandler(OnElapsedTime);
            timer.Interval = (Convert.ToInt32(ConfigurationManager.AppSettings["ServiceFrequencyInMins"]) * 60 * 1000); //number in milisecinds
            timer.Enabled = true;
        }

        protected override void OnStop()
        {
            logging.LogInfo("Service is stopped at " + DateTime.Now);
        }

        public void OnElapsedTime(object source, ElapsedEventArgs e)
        {
            OnServiceStart();
            //NotificationMaster notificationMaster = new NotificationMaster();
            //WriteToFile("Service is recall at " + DateTime.Now);
            //notificationMaster.ExecutionServicemaster();

            //PushNotification pushNotification = new PushNotification();
            //pushNotification.ProcessNotification();
        }

        public void WriteToFile(string Message)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + "\\Logs";
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string filepath = AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\ServiceLog_" + DateTime.Now.Date.ToShortDateString().Replace('/', '_') + ".txt";
            if (!File.Exists(filepath))
            {
                // Create a file to write to. 
                using (StreamWriter sw = File.CreateText(filepath))
                {
                    sw.WriteLine(Message);
                }
            }
            else
            {
                using (StreamWriter sw = File.AppendText(filepath))
                {
                    sw.WriteLine(Message);
                }
            }
        }

        public void OnServiceStart()
        {
            //string Passwrd = encryptDecryptService.EncryptValue("@dmin@1234");
            try
            {
                logging.LogInfo("Get Service Data Process Start " + DateTime.Now);
                SessionObject.DBConn = DBConn.GetConnectionString(ConfigurationManager.AppSettings["AppKeyPath"]);
                NotificationMaster notificationMaster = new NotificationMaster();
                notificationMaster.ExecutionServicemaster();
                logging.LogInfo("Get Service Data Process End " + DateTime.Now);

                logging.LogInfo("Send Notification Process Start " + DateTime.Now);
                PushNotification pushNotification = new PushNotification();
                pushNotification.ProcessNotification();
                logging.LogInfo("Send Notification Process End " + DateTime.Now);
            }
            catch (Exception ex)
            {
                logging.LogError("Exception occured at the root level " + DateTime.Now + Environment.NewLine + ex.Message);
            }
        }
    }
}
