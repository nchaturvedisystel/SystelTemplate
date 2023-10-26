using Application.DTOs.Common;
using Application.DTOs.User;
using System.Threading.Tasks;

namespace Application.Interfaces.User
{
    public interface IUserMaster
    {
        public Task<UserList> UserCRUD(UserMasterDTO userMasterDTO);
        public Task<UserList> CreateUserCredentials(UserCredDTO userLoginCRUD_DTO);
        public Task<UserWorkCenterList> UserWorkCenterCRUD(UserWorkCenterDTO userWorkCenterDTO);
        public Task<UserRoleList> UserRoleCRUD(UserRoleDTO userRoleDTO);
        public Task<UserDashboardList> UserDashboardGet(UserDashboardDTO userDashboardDTO);
        public Task<UserMasterDTO> UserStatusUpdate(UserMasterDTO userMasterDTO);
        public Task<DropDownList> GetAllUserList();

    }
}
