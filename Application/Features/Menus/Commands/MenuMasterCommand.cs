using Application.DTOs;
using Application.Features.Shipments.Commands;
using Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Menus.Commands
{
    public class MenuMasterCommand : IRequest<MenuMasterList>
    {
        public int UserId { get; set; }
    }
    internal class MenuMasterCommandHandler : IRequestHandler<MenuMasterCommand, MenuMasterList>
    {
        protected readonly IMenuContract _menuService;

        public MenuMasterCommandHandler(IMenuContract menuService)
        {
            _menuService = menuService;
        }
        public async Task<MenuMasterList> Handle(MenuMasterCommand request, CancellationToken cancellationToken)
        {
            return await _menuService.GetMenuForUser(request.UserId);
        }
    }
}
