using Application;
using Infrastructure;
using Infrastructure.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using NLog.Extensions.Logging;
using System;
using System.IO;
using System.Reflection;
using WebAPI.Filter;

namespace WebAPI
{
    public static class ServiceExtentions
    {

        private static string XmlCommentsFilePath(string xmlDocFileName)
                           => Path.Combine(AppContext.BaseDirectory, xmlDocFileName);
        private static string GetAssemblyName()
                                   => typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

        public static void AddServices(this IServiceCollection services, IConfiguration _config)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddScoped<ValidationFilterAttribute>();
            services.AddNLogService(_config);
            services.AddApplicationLayer();
            services.AddInfrastructureLayer();
            services.AddTransient<IJwtToken, JWTToken>();
            services.AddSharedInfrastructure(_config);
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddControllers();
            services.AddSwagger();
        }

        public static void AddSwagger(this IServiceCollection services)
        {
            var executingAssemblySimpleName = Assembly.GetExecutingAssembly().GetName().Name;


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Traveller API", Version = "v1" });
                c.IncludeXmlComments(XmlCommentsFilePath("WebAPI.xml"));
                c.IncludeXmlComments(XmlCommentsFilePath("Application.xml"));
            });

        }

        public static void AddNLogService(this IServiceCollection services, IConfiguration config)
        {
               services.AddLogging(loggingBuilder =>
               {
                   loggingBuilder.ClearProviders();
                   loggingBuilder.SetMinimumLevel(LogLevel.Trace);
                   loggingBuilder.AddNLog(config);
               })
               .BuildServiceProvider();
        }

        

    }
}
