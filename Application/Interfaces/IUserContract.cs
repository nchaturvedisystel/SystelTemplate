using Application.DTOs;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserContract
    {
        public Task<UserDTO> Authenticate(string companyCode, string userName, string password);
    }
}
