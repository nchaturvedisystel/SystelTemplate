namespace Application.Interfaces
{
    public interface IEncryptDecrypt
    {
        string EncryptValue(string inputValue);
        string EncryptValue(string inputValue, string encryptionKey);
        string DecryptValue(string inputValue);
        string DecryptValue(string inputValue, string encryptionKey);
    }
}
