using Application.Interfaces;
using Application.Interfaces.Admin;
using Application.Interfaces.Common;
using Application.Interfaces.SupportDesk;
using Application.Interfaces.User;
using Infrastructure.Persistance.Services;
using Infrastructure.Persistance.Services.Admin;
using Infrastructure.Persistance.Services.Common;
using Infrastructure.Persistance.Services.SupportDesk;
using Infrastructure.Persistance.Services.Traveler;
using Infrastructure.Persistance.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.Windows.Input;
using WebAPI.Authorization;
using WebAPI.Common.Middlewares;

namespace WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddServices(Configuration);
            //For Authorization
            services.AddHttpContextAccessor();
            services.AddSingleton<IAuthorizationPolicyProvider, AuthorizeUserPolicyProvider>();
            services.AddSingleton<IAuthorizationHandler, AuthorizeUserHandler>();

            //Common Services
            services.AddTransient<IUserContract, UserService>();
            services.AddTransient<IUserMaster, UserService>();
            services.AddTransient<IMenuContract, MenuMasterService>();
            //services.AddTransient<IGlobalSearch, GlobalSearchService>();
            services.AddTransient<IUserTimeTracking, UserTimeTrackingService>();
            services.AddTransient<ICompany, CompanyMasterService>();

            //SupportDesk Service
            services.AddTransient<ISupportTicket, TicketService>();
            services.AddTransient<ITicketResolverList, MenuMasterService>();
            services.AddTransient<ITicketActivity, TicketActivityService>();
            services.AddTransient<IClientWorkList, MenuMasterService>();
            services.AddTransient<ITicketAsignee, TicketAsigneeService>();
            services.AddTransient<ISupportDashboard, DashboardService>();

            //Admin Services
            services.AddTransient<IMenuManage, MenuMasterService>();

            //Services
            services.AddTransient<IRole, RolesService>();
            services.AddTransient<ISubRole, SubRoleService>();
            services.AddTransient<IUserGroup, UserGroupService>();
            services.AddTransient<IWorkCenter, WorkCenterService>();


            //For Directory Browsing, comment out for Prod Release
            services.AddDirectoryBrowser();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseMiddleWareBefore();
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseRequestLogging();

            //For Directory Browsing, comment out for Prod Release
            app.UseStaticFiles();// For the wwwroot folder
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                            Path.Combine(Directory.GetCurrentDirectory(), "Client")),
                RequestPath = "/Client"
            });
            //Enable directory browsing
            app.UseDirectoryBrowser(new DirectoryBrowserOptions
            {
                FileProvider = new PhysicalFileProvider(
                            Path.Combine(Directory.GetCurrentDirectory(), "Client")),
                RequestPath = "/Client"
            });

            app.UseAuthorization();
            app.UseCustomExceptionHandler();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
