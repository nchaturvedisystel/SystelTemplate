using Application;
using Application.Interfaces;
using Domain.Settings;
using DTO;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebAPI
{

    public interface IJwtToken
    {
        string CreateUserToken(UserSessionDTO users);
        UserSessionDTO ValidateToken(string token);
    }

    internal class JWTToken : IJwtToken
    {
        private static TokenValidationParameters validationParameters;

        JWTSettings _settings;
        protected readonly IEncryptDecrypt _encryptDecrypt;
        public JWTToken(IOptions<JWTSettings> options, IEncryptDecrypt encryptDecrypt)
        {
            _settings = options.Value;
            _encryptDecrypt = encryptDecrypt;
        }

        public string CreateUserToken(UserSessionDTO users)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            
            var key = Encoding.ASCII.GetBytes(_settings.AppSecret);

            SessionParam session = new SessionParam
            {
                Param0 = _encryptDecrypt.EncryptValue(users.ID.ToString()),
                Param1 = _encryptDecrypt.EncryptValue(users.UserName),
                Param2 = _encryptDecrypt.EncryptValue(users.Designation),
                Param3 = _encryptDecrypt.EncryptValue(users.EmailId),
                Param4 = _encryptDecrypt.EncryptValue(users.MobileNo),
                Param5 = _encryptDecrypt.EncryptValue(users.RoleId.ToString()),
                Param6 = _encryptDecrypt.EncryptValue(users.CompanyId.ToString()),
                Param7 = _encryptDecrypt.EncryptValue(users.DefaultCompanyId.ToString()),
            };

            string strClaimdata = JsonConvert.SerializeObject(session);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim( type: ClaimTypes.Name, value: strClaimdata),
                }),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_settings.TokenExpiryMinute)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public UserSessionDTO ValidateToken(string token)
        {
            SessionParam sessionParam = null;
            UserSessionDTO userSessionDTO = null;
            try
            {
                byte[] key = Encoding.ASCII.GetBytes(_settings.AppSecret);
                token = token.Replace(ConstantValues.Bearer, "").Trim();
                validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };

                var claimsPrincipal = new JwtSecurityTokenHandler()
                    .ValidateToken(token, validationParameters, out var rawValidatedToken);

                sessionParam = JsonConvert.DeserializeObject<SessionParam>(Convert.ToString(claimsPrincipal.Identity.Name));
                userSessionDTO = new UserSessionDTO
                {
                    ID = Convert.ToInt32(_encryptDecrypt.DecryptValue(sessionParam.Param0)),
                    UserName = _encryptDecrypt.DecryptValue(sessionParam.Param1),
                    Designation = _encryptDecrypt.DecryptValue(sessionParam.Param2),
                    EmailId = _encryptDecrypt.DecryptValue(sessionParam.Param3),
                    MobileNo = _encryptDecrypt.DecryptValue(sessionParam.Param4),
                    RoleId = _encryptDecrypt.DecryptValue(sessionParam.Param5),
                    CompanyId = _encryptDecrypt.DecryptValue(sessionParam.Param6),
                    DefaultCompanyId = _encryptDecrypt.DecryptValue(sessionParam.Param7)                    
                };

            }
            catch (SecurityTokenExpiredException)
            {
            }
            catch (SecurityTokenValidationException)
            {
            }
            catch (ArgumentException)
            {
            }
            return userSessionDTO;
        }
    }
}
