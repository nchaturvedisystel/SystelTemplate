namespace Domain.Settings
{
    public class APISettings
    {
        public string UploadPath { get; set; }
        public string ApiRootFolder { get; set; }
        public string UIRootFolder { get; set; }
        public string DocumentUploadBaseUrl { get; set; }
    }
    
    public class JWTSettings
    {
        public string EncryptionKey { get; set; }
        public string TokenExpiryMinute { get; set; }
        public string AppSecret { get; set; }
    }
}
