using Microsoft.Extensions.Logging;
using Polly;
using System;
using System.Net;
using System.Net.Http;

namespace Infrastructure
{
    internal static class PollyRetryRegistry
    {
        public static int allowedRetries = 3;
        public static int retryIntervalInSeconds = 2;
        public static AsyncPolicy<HttpResponseMessage> GetPolicyAsync(ILogger _logger)
        {
            return Policy.HandleResult<HttpResponseMessage>(r => r.StatusCode == HttpStatusCode.InternalServerError 
                                                           || r.StatusCode == HttpStatusCode.ServiceUnavailable || r.StatusCode == HttpStatusCode.BadGateway).Or<HttpRequestException>()
                           .WaitAndRetryAsync(allowedRetries, retryAttempt => TimeSpan.FromSeconds(Math.Pow(retryIntervalInSeconds, retryAttempt)),
                           (exception, timeSpan, retryCount, context) =>
                           {
                               _logger.LogWarning($"Error occured while connecting to API, retry attempt: { retryCount } ");
                           });
        }
    }
}
