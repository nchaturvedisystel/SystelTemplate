using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class Logging
    {
        public void Log(string Message)
        {
            string YearStr = DateTime.Now.Year.ToString();
            string MonthStr = DateTime.Now.Month.ToString();
            string DayStr = DateTime.Now.Day.ToString();

            string path = AppDomain.CurrentDomain.BaseDirectory + $"\\Logs\\{YearStr}\\{MonthStr}\\{DayStr}";
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string filepath = AppDomain.CurrentDomain.BaseDirectory + $"\\Logs\\{YearStr}\\{MonthStr}\\{DayStr}\\ServiceLog_" + DateTime.Now.Date.ToShortDateString().Replace('/', '_') + ".txt";
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
        public void LogInfo(string Message)
        {
            string YearStr = DateTime.Now.Year.ToString();
            string MonthStr = DateTime.Now.Month.ToString();
            string DayStr = DateTime.Now.Day.ToString();

            string path = AppDomain.CurrentDomain.BaseDirectory + $"\\Logs\\{YearStr}\\{MonthStr}\\{DayStr}\\Info";
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string filepath = AppDomain.CurrentDomain.BaseDirectory + $"\\Logs\\{YearStr}\\{MonthStr}\\{DayStr}\\Info\\ServiceLog_" + DateTime.Now.Date.ToShortDateString().Replace('/', '_') + ".txt";
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
        public void LogError(string Message)
        {
            string YearStr = DateTime.Now.Year.ToString();
            string MonthStr = DateTime.Now.Month.ToString();
            string DayStr = DateTime.Now.Day.ToString();

            string path = AppDomain.CurrentDomain.BaseDirectory + $"\\Logs\\{YearStr}\\{MonthStr}\\{DayStr}\\Error";
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string filepath = AppDomain.CurrentDomain.BaseDirectory + $"\\Logs\\{YearStr}\\{MonthStr}\\{DayStr}\\Error\\ServiceLog_" + DateTime.Now.Date.ToShortDateString().Replace('/', '_') + ".txt";
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
    }
}
