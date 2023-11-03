using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace NotificationService.Common
{
    public class DBConn
    {
        public static string GetConnectionString(string KeyPath)
        {
            string connectionString = "";
            System.Drawing.Image img = new Bitmap(KeyPath);
            Bitmap bitmap = new Bitmap(img);

            Stream messageStream = new MemoryStream();

            byte[] keyBytes = Encoding.Unicode.GetBytes("Systel#$0312");
            Stream keyStream = new MemoryStream(keyBytes);

            ExtractMessageFromBitmap(bitmap, keyStream, ref messageStream);

            messageStream.Seek(0, SeekOrigin.Begin);
            StreamReader reader = new StreamReader(messageStream, Encoding.Unicode);
            string readerContent = reader.ReadToEnd();
            connectionString = readerContent;

            return connectionString;
        }
        //public static void ValidateSQLServiceStatus()
        //{
        //    string ServiceStatus = "";
        //    try
        //    {
        //        var Service = System.ServiceProcess.ServiceController.GetServices(Environment.MachineName).FirstOrDefault(s => s.ServiceName == "SQL Server (SQL EXPRESS)");
        //        if (Service == null)
        //            ServiceStatus = "SQL Server not installed ";
        //        else
        //        {
        //            if (Service.Status.ToString() == "Stopped")
        //            {
        //                Service.Start();
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Log log = new Log();
        //        log.ErrorLog(ex);
        //    }
        //}
        public static void ExtractMessageFromBitmap(Bitmap bitmap, Stream keyStream, ref Stream messageStream)
        {
            HideOrExtract(ref messageStream, bitmap, keyStream, true, false);
        }
        private static void HideOrExtract(ref Stream messageStream, Bitmap bitmap, Stream keyStream, bool extract, bool useGrayscale)
        {
            //Current count of pixels between two hidden message-bytes
            //Changes with every hidden byte according to the key
            int currentStepWidth = 0;
            //Current byte in the key stream - normal direction
            byte currentKeyByte;
            //Current byte in the key stream - reverse direction
            byte currentReverseKeyByte;
            //current position in the key stream
            long keyPosition;

            //maximum X and Y position
            int bitmapWidth = bitmap.Width - 1;
            int bitmapHeight = bitmap.Height - 1;

            //Color component to hide the next byte in (0-R, 1-G, 2-B)
            //Rotates with every hidden byte
            int currentColorComponent = 0;

            //Stores the color of a pixel
            Color pixelColor;

            //Length of the message
            int messageLength;

            if (extract)
            {
                //Read the length of the hidden message from the first pixel
                pixelColor = bitmap.GetPixel(0, 0);
                messageLength = (pixelColor.R << 2) + (pixelColor.G << 1) + pixelColor.B;
                messageStream = new MemoryStream(messageLength);
            }
            else
            {

                messageLength = (int)messageStream.Length;

                if (messageStream.Length >= 16777215)
                { //The message is too long
                    string exceptionMessage = "Themessage is too long, only 16777215 bytes are allowed.";
                    throw new Exception(exceptionMessage);
                }

                //Check size of the carrier image

                //Pixels available
                long countPixels = bitmapWidth * bitmapHeight - 1;
                //Pixels required - start with one pixel for length of message
                long countRequiredPixels = 1;
                //add up the gaps between used pixels (sum up all the bytes of the key)
                while (keyStream.Position < keyStream.Length && keyStream.Position < messageLength)
                {
                    countRequiredPixels += keyStream.ReadByte();
                }
                //If the key is shorter than the message, it will be repeated again and again
                //Multiply with count of key periods
                countRequiredPixels *= (long)Math.Ceiling(messageStream.Length / (float)keyStream.Length);

                if (countRequiredPixels > countPixels)
                { //The bitmap is too small
                    string exceptionMessage = "The image is too small for this message and key. " + countRequiredPixels + " pixels are required.";
                    throw new Exception(exceptionMessage);
                }

                //Write length of the bitmap into the first pixel
                int colorValue = messageLength;
                int red = colorValue >> 2;
                colorValue -= red << 2;
                int green = colorValue >> 1;
                int blue = colorValue - (green << 1);
                pixelColor = Color.FromArgb(red, green, blue);
                bitmap.SetPixel(0, 0, pixelColor);
            }

            //Reset the streams
            keyStream.Seek(0, SeekOrigin.Begin);
            messageStream.Seek(0, SeekOrigin.Begin);

            //Current position in the carrier bitmap
            //Start with 1, because (0,0) contains the message's length
            Point pixelPosition = new Point(1, 0);

            //Loop over the message and hide each byte
            for (int messageIndex = 0; messageIndex < messageLength; messageIndex++)
            {

                //repeat the key, if it is shorter than the message
                if (keyStream.Position == keyStream.Length)
                {
                    keyStream.Seek(0, SeekOrigin.Begin);
                }
                //Get the next pixel-count from the key, use "1" if it's 0
                currentKeyByte = (byte)keyStream.ReadByte();
                currentStepWidth = currentKeyByte == 0 ? (byte)1 : currentKeyByte;

                //jump to reverse-read position and read from the end of the stream
                keyPosition = keyStream.Position;
                keyStream.Seek(-keyPosition, SeekOrigin.End);
                currentReverseKeyByte = (byte)keyStream.ReadByte();
                //jump back to normal read position
                keyStream.Seek(keyPosition, SeekOrigin.Begin);

                //Perform line breaks, if current step is wider than the image
                while (currentStepWidth > bitmapWidth)
                {
                    currentStepWidth -= bitmapWidth;
                    pixelPosition.Y++;
                }

                //Move X-position
                if (bitmapWidth - pixelPosition.X < currentStepWidth)
                {
                    pixelPosition.X = currentStepWidth - (bitmapWidth - pixelPosition.X);
                    pixelPosition.Y++;
                }
                else
                {
                    pixelPosition.X += currentStepWidth;
                }

                //Get color of the "clean" pixel
                pixelColor = bitmap.GetPixel(pixelPosition.X, pixelPosition.Y);

                if (extract)
                {
                    //Extract the hidden message-byte from the color
                    byte foundByte = (byte)(currentReverseKeyByte ^ GetColorComponent(pixelColor, currentColorComponent));
                    messageStream.WriteByte(foundByte);
                    //Rotate color components
                    currentColorComponent = currentColorComponent == 2 ? 0 : currentColorComponent + 1;

                }
                else
                {
                    //To add a bit of confusion, xor the byte with a byte read from the keyStream
                    int currentByte = messageStream.ReadByte() ^ currentReverseKeyByte;

                    if (useGrayscale)
                    {
                        pixelColor = Color.FromArgb(currentByte, currentByte, currentByte);
                    }
                    else
                    {
                        //Change one component of the color to the message-byte
                        //SetColorComponent(ref pixelColor, currentColorComponent, currentByte);
                        //Rotate color components
                        currentColorComponent = currentColorComponent == 2 ? 0 : currentColorComponent + 1;
                    }
                    bitmap.SetPixel(pixelPosition.X, pixelPosition.Y, pixelColor);
                }
            }

            //the stream will be closed by the calling method
            bitmap = null;
            keyStream = null;
        }
        private static byte GetColorComponent(Color pixelColor, int colorComponent)
        {
            byte returnValue = 0;
            switch (colorComponent)
            {
                case 0:
                    returnValue = pixelColor.R;
                    break;
                case 1:
                    returnValue = pixelColor.G;
                    break;
                case 2:
                    returnValue = pixelColor.B;
                    break;
            }
            return returnValue;
        }
    }
}
