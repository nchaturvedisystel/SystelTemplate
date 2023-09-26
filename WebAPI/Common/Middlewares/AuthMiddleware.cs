using Application;
using Application.Interfaces;
using DTO;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace WebAPI
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;
        protected IUserSession session;
        protected IJwtToken _jwtToken;
        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IUserSession sessionContract, IJwtToken jwtToken)
        {
            session = sessionContract;
            _jwtToken = jwtToken;
            bool isValid = false;
            string authHeader = context.Request.Headers[ConstantValues.Authorization];
            if (authHeader != null && authHeader.StartsWith(ConstantValues.Bearer) && isValid == false)
            {
                isValid = IsJWTValidation(authHeader, session, _jwtToken);
            }

            if (!isValid)
            {
                await context.Response.WriteAsync("Your identity could not verify. Please reach out to the administrator");
                return;
            }

            await _next(context);
        }

        public bool IsJWTValidation(string authHeader, IUserSession session, IJwtToken jwtToken)
        {
            UserSessionDTO sessionParam = jwtToken.ValidateToken(authHeader);
            if (sessionParam != null)
            {
                session.AddSessionValue(ConstantValues.UserID, sessionParam.ID);
                session.AddSessionValue(ConstantValues.UserName, sessionParam.UserName);
                return true;
            }
            
            return false;
        }       
    }
}
