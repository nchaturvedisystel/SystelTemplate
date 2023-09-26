using System.Collections.Generic;

namespace Application.Interfaces
{
    public interface IUserSession
    {
        Dictionary<string, object> SessionData { get; set; }
        void AddSessionValue<T>(string sessionKey, T sessionValue);
        T GetSessionValue<T>(string key);
        string GetSessionValue(string key);
        void RemoveSessionValue(string sessionKey);
        bool ContainsKey(string sessionKey);
    }
}
