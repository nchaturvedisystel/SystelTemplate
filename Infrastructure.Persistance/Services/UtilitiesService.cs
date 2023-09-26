using Domain.Settings;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistance.Services
{
    public static class Utilities
    {
        public static string RemoveSpecialCharacters(this string str)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '.' || c == '_')
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }
        public static string SaveFileFromBase64( string webRootPath, string filePath, string base64File)
        {
            var base64Data = base64File.Split(new string[] { ";base64," }, StringSplitOptions.None);
            string base64String = base64Data[1];
            string base64Extention = Convert.ToString(base64Data[0].Split(new string[] { "/" }, StringSplitOptions.None)[1]);

            filePath = $"{filePath}.{base64Extention}";
            string filefullPath = $"{webRootPath}\\{filePath}";

            //Deleting file if already exists
            if (File.Exists(filefullPath))
            {
                File.Delete(filefullPath);
            }

            FileInfo fileInfo = new FileInfo(filefullPath);

            //Id Directory do not exists, create it
            if (!fileInfo.Exists)
                Directory.CreateDirectory(fileInfo.Directory.FullName);

            //Saving the new File
            File.WriteAllBytes(filefullPath, Convert.FromBase64String(base64String));

            return filePath;
        }
        public static string GetUserProfileImage(APISettings _settings, string webRootPath, string userId)
        {
            webRootPath = webRootPath.Replace($"\\{_settings.ApiRootFolder}", $"\\{_settings.UIRootFolder}");
            string filePath = $"wwwroot\\img\\users\\user_{userId}.jpg";
            string filefullPath = $"{webRootPath}\\{filePath}";
            if (!File.Exists(filefullPath))
            {
                filefullPath = $"\\img\\users\\defaultUser.jpg";
            }
            else
            {
                filefullPath = $"\\img\\users\\user_{userId}.jpg";
            }
            return filefullPath;
        }
    }
}
