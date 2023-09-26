using Application.Interfaces;
using System;
using System.Collections.Generic;

namespace Infrastructure.Shared.Services
{
    public class SessionService : IUserSession
    {
        public SessionService()
        {
            SessionData = new Dictionary<string, object>();
        }
        public Dictionary<string, object> SessionData { get; set; }

        public void AddSessionValue<T>(string sessionKey, T sessionValue)
        {
            if (SessionData.ContainsKey(sessionKey))
                SessionData.Remove(sessionKey);

            SessionData.Add(sessionKey, sessionValue);
        }

        public bool ContainsKey(string sessionKey)
        {
            if (SessionData.ContainsKey(sessionKey))
                return true;
            else
                return false;
        }

        public T GetSessionValue<T>(string key)
        {
            var value = default(T);
            if (SessionData != null)
            {
                if (SessionData.ContainsKey(key))
                    value = (T)Convert.ChangeType(SessionData[key], typeof(T));

            }
            return value;
        }

        public string GetSessionValue(string key)
        {
            return GetSessionValue<string>(key);
        }

        public void RemoveSessionValue(string sessionKey)
        {
            if (SessionData != null)
                if (SessionData.ContainsKey(sessionKey))
                    SessionData.Remove(sessionKey);
        }
    }
}
