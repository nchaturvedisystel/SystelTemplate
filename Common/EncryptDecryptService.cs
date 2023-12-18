using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class EncryptDecryptService
    {
        public static string EncryptionKey = "Travellerapi2023";
        public string EncryptValue(string inputValue)
        {
            string encryptionKey = string.Empty;
            if (string.IsNullOrEmpty(encryptionKey))
                encryptionKey = EncryptionKey;

            return EncryptValue(inputValue, encryptionKey);

        }

        public string EncryptValue(string inputValue, string encryptionKey)
        {
            if (string.IsNullOrEmpty(inputValue))
                return string.Empty;


            if (string.IsNullOrEmpty(encryptionKey))
                throw new Exception("Please provide enryption key");

            var keybytes = Encoding.UTF8.GetBytes(encryptionKey);
            var iv = Encoding.UTF8.GetBytes(encryptionKey);

            string result = EncryptStringToBytes(inputValue, keybytes, iv);
            result = ToHexString(result);

            return result;

        }

        public string DecryptValue(string inputValue)
        {
            string encryptionKey = string.Empty;
            if (string.IsNullOrEmpty(encryptionKey))
                encryptionKey = EncryptionKey;

            return DecryptValue(inputValue, encryptionKey);

        }

        public string DecryptValue(string inputValue, string encryptionKey)
        {

            if (string.IsNullOrEmpty(inputValue))
                return string.Empty;

            string result = string.Empty;

            inputValue = Convert.ToBase64String(ParseHex(inputValue));

            var keybytes = Encoding.UTF8.GetBytes(encryptionKey);
            var iv = Encoding.UTF8.GetBytes(encryptionKey);

            var encrypted = Convert.FromBase64String(inputValue);

            try
            {
                result = DecryptStringFromBytes(encrypted, keybytes, iv);
                result = result.Replace("\"", "");
            }
            catch (Exception)
            {
                return string.Empty;
            }

            return result;


        }
        private string ToHexString(string inputHex)
        {
            byte[] bytes = Convert.FromBase64String(inputHex);
            StringBuilder sb = new StringBuilder();
            foreach (byte b in bytes) sb.Append(b.ToString("x2"));
            return sb.ToString();
        }

        private byte[] ParseHex(string hexString)
        {
            if ((hexString.Length & 1) != 0)
            {
                throw new ArgumentException("Input must have even number of characters");
            }
            int length = hexString.Length / 2;
            byte[] ret = new byte[length];
            for (int i = 0, j = 0; i < length; i++)
            {
                int high = ParseNybble(hexString[j++]);
                int low = ParseNybble(hexString[j++]);
                ret[i] = (byte)((high << 4) | low);
            }

            return ret;
        }

        private int ParseNybble(char c)
        {

            switch (c)
            {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    return c - '0';
                case 'a':
                case 'b':
                case 'c':
                case 'd':
                case 'e':
                case 'f':
                    return c - ('a' - 10);
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                    return c - ('A' - 10);
                default:
                    throw new ArgumentException("Invalid nybble: " + c);
            }
            //return c;
        }

        #region Encryption
        private string EncryptStringToBytes(string plainText, byte[] key, byte[] iv)
        {
            try
            {
                // Check arguments.  
                if (plainText == null || plainText.Length <= 0)
                {
                    throw new ArgumentNullException(nameof(plainText), "plain text is null.");
                }
                if (key == null || key.Length <= 0)
                {
                    throw new ArgumentNullException(nameof(key), "Key is null.");
                }
                if (iv == null || iv.Length <= 0)
                {
                    throw new ArgumentNullException(nameof(iv), "iv is null.");
                }
                byte[] encrypted;

                using (var rijAlg = new RijndaelManaged())
                {
                    rijAlg.Mode = CipherMode.CBC;
                    rijAlg.Padding = PaddingMode.PKCS7;
                    rijAlg.FeedbackSize = 128;
                    //rijAlg.KeySize = 256;

                    rijAlg.Key = key;
                    rijAlg.IV = iv;

                    // Create a decrytor to perform the stream transform.  
                    var encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);

                    // Create the streams used for encryption.  
                    using (var msEncrypt = new MemoryStream())
                    {
                        using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        {
                            using (var swEncrypt = new StreamWriter(csEncrypt))
                            {
                                //Write all data to the stream.  
                                swEncrypt.Write(plainText);
                            }
                            encrypted = msEncrypt.ToArray();
                        }
                    }
                }

                // Return the encrypted bytes from the memory stream.  
                return Convert.ToBase64String(encrypted);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

            }

            return string.Empty;
        }

        private string DecryptStringFromBytes(byte[] cipherText, byte[] key, byte[] iv)
        {
            // Check arguments.  
            if (cipherText == null || cipherText.Length <= 0)
            {
                throw new ArgumentNullException(nameof(cipherText), "ciphertext is null");
            }
            if (key == null || key.Length <= 0)
            {
                throw new ArgumentNullException(nameof(key), "key is null");
            }
            if (iv == null || iv.Length <= 0)
            {
                throw new ArgumentNullException(nameof(iv), "iv is null.");
            }

            // Declare the string used to hold  
            // the decrypted text.  
            string plaintext = string.Empty;

            // Create an RijndaelManaged object  
            // with the specified key and IV.  

            using (var rijAlg = new RijndaelManaged())
            {
                //Settings  
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                // Create a decrytor to perform the stream transform.  
                var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

                try
                {
                    // Create the streams used for decryption.  
                    using (var msDecrypt = new MemoryStream(cipherText))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {

                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                plaintext = srDecrypt.ReadToEnd();

                            }

                        }
                    }
                }
                catch
                {
                    plaintext = "keyError";
                }
            }
            return plaintext;
        }
        #endregion
    }
}
