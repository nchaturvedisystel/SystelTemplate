using Application.DTOs.Admin;
using Domain.Settings;
using Infrastructure.Persistance.Services.User;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces.Admin;
using Application.Interfaces.User;
using Application.Interfaces;
using Dapper;
using Application.DTOs.SupportDesk;
using System.Net;
using System.Numerics;

namespace Infrastructure.Persistance.Services.Admin
{
    public class CompanyMasterService : DABase, ICompany
    {
        APISettings _settings;
        private const string SP_CompanyMaster_CRUD = "ana.CompanyMaster_CRUD";

        private ILogger<CompanyMasterService> _logger;


        public CompanyMasterService(IOptions<ConnectionSettings> connectionSettings, ILogger<CompanyMasterService> logger, IOptions<APISettings> settings) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
            _settings = settings.Value;
        }

        public async Task<CompanyList> GetCompany(CompanyMasterDTO companyMasterDTO)
        {
            CompanyList response = new CompanyList();

            _logger.LogInformation($"Started fetching all support tickets for the logged in user {companyMasterDTO.CompanyId}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Companies = await connection.QueryAsync<CompanyMasterDTO>(SP_CompanyMaster_CRUD, new
                    {
                        CompanyId = companyMasterDTO.CompanyId,
                        CName = companyMasterDTO.CName,
                        CCode = companyMasterDTO.CCode,
                        CDesc = companyMasterDTO.CDesc,
                        CAddress = companyMasterDTO.CAddress,
                        Email = companyMasterDTO.Email,
                        Phone = companyMasterDTO.Phone,
                        Website = companyMasterDTO.Website,
                        Category = companyMasterDTO.Category,
                        SubCategory = companyMasterDTO.SubCategory,
                        ContactPerson = companyMasterDTO.ContactPerson,
                        ModifiedBy = companyMasterDTO.ModifiedBy,
                        CreatedBy = companyMasterDTO.CreatedBy,
                        IsActive = companyMasterDTO.IsActive,
                        IsDeleted = companyMasterDTO.IsDeleted,
                        CType = companyMasterDTO.CType,
                        ActionUser = companyMasterDTO.ActionUser,
                    }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


            return response;
        }

    }
}
