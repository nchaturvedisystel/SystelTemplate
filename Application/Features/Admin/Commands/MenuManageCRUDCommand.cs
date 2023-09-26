using Application.DTOs.Admin;
using Application.Interfaces.Admin;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Admin.Commands
{
    public class MenuManageCRUDCommand : IRequest<MenuManageList>
    {
        public MenuManageDTO menuManageDTO { get; set; }
    }
    internal class MenuMasterCRUDHandler : IRequestHandler<MenuManageCRUDCommand, MenuManageList>
    {
        protected readonly IMenuManage _menuMasterCrud;

        public MenuMasterCRUDHandler(IMenuManage menuMasterCrud)
        {
            _menuMasterCrud = menuMasterCrud;
        }
        public async Task<MenuManageList> Handle(MenuManageCRUDCommand request, CancellationToken cancellationToken)
        {
            return await _menuMasterCrud.ManageMenu(request.menuManageDTO);
        }
    }
}
