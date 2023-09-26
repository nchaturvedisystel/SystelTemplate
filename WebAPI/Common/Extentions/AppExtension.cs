using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Threading.Tasks;
using System;
using WebAPI.Authorization;
using WebAPI.Common.Middlewares;

namespace WebAPI
{
    public static class AppExtension
    {
        private const string SwaggerJson = "v1/swagger.json";
        private const string DescriptiveName = "Traveller API";

        /// <summary>
        /// Add middleware which require to in middleware pipeline before routing data collected
        /// </summary>
        /// <param name="app"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseMiddleWareBefore(this IApplicationBuilder app)
        {
            app.UseCors(x => x
               .AllowAnyMethod()
               .AllowAnyHeader()
               .SetIsOriginAllowed(origin => true) // allow any origin
               .AllowCredentials()); // allow credentials
            app.UseSwaggerConfiguration();
            //app.UseMiddleware<AuthMiddleware>();
            return app;
        }


        private static void UseSwaggerConfiguration(this IApplicationBuilder app)
        {
            app.UseSwagger()
              .UseSwaggerUI(c =>
              {
                  string swaggerJsonBasePath = string.IsNullOrWhiteSpace(c.RoutePrefix) ? "." : "..";
                  c.SwaggerEndpoint(SwaggerJson, DescriptiveName);
              });
        }

        public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorHandlerMiddleware>();
        }

        public static void UseRequestLogging(this IApplicationBuilder builder)
        {
            builder.UseMiddleware<LoggingMiddleware>();
        }
    }
}
