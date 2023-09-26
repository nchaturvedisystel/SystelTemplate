using Application.Exceptions;
using Application;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.IO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using WebAPI.Filter;

namespace WebAPI
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly RecyclableMemoryStreamManager _recyclableMemoryStreamManager;
        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
            _recyclableMemoryStreamManager = new RecyclableMemoryStreamManager();
        }

        public async Task Invoke(HttpContext context, ILogger<ErrorHandlerMiddleware> _logger)
        {
            context.Request.EnableBuffering();
            await using var requestStream = _recyclableMemoryStreamManager.GetStream();
            await context.Request.Body.CopyToAsync(requestStream);
            var result = ReadStreamInChunks(requestStream);
            context.Request.Body.Position = 0;

            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                bool notifyITSupport = true;
                var response = context.Response;
                response.ContentType = "application/json";
                var responseModel = new APIResponse<string>() { Success = false, Message = error?.Message };


                switch (error)
                {
                    case ApiException e:
                        // custom application error
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        notifyITSupport = false;
                        break;
                    case ValidationException e:
                        // custom application error
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        responseModel.Message = "One or more validation error occured"; //e.Errors;
                        notifyITSupport = false;
                        break;
                    default:
                        // unhandled error
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        //responseModel.messages.Clear();
                        //responseModel.messages.Add("The system encountered an internal error. Please contact the administrator.");
                        break;
                }

                try
                {
                    using (_logger.BeginScope(new[] {
                        new KeyValuePair<string, object>("RequestId", context.TraceIdentifier),
                        new KeyValuePair<string, object>("RequestUrl", string.Concat(context.Request.Host, context.Request.Path)),
                        new KeyValuePair<string, object>("Payload", result)
                    }))
                    {
                        if (notifyITSupport) // do not sent an email incase of validation errors
                        {
                            _logger.LogError(error, error.Message);
                        }
                    }
                }
                catch (Exception)
                {
                }


                var resresult = JsonConvert.SerializeObject(responseModel);

                await response.WriteAsync(resresult);

            }
        }


        private static string ReadStreamInChunks(Stream stream)
        {
            const int readChunkBufferLength = 4096;

            stream.Seek(0, SeekOrigin.Begin);

            using var textWriter = new StringWriter();
            using var reader = new StreamReader(stream);

            var readChunk = new char[readChunkBufferLength];
            int readChunkLength;

            do
            {
                readChunkLength = reader.ReadBlock(readChunk, 0, readChunkBufferLength);
                textWriter.Write(readChunk, 0, readChunkLength);
            } while (readChunkLength > 0);

            return textWriter.ToString();
        }

    }
}
