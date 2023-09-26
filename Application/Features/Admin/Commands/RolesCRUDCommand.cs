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
    public class RolesCRUDCommand : IRequest<RolesList>
    {
        public RolesDTO rolesDTO { get; set; }
    }
    internal class RolesHandler : IRequestHandler<RolesCRUDCommand, RolesList>
    {
        protected readonly IRole _role;

        public RolesHandler(IRole role)
        {
           _role = role;
        }
        public async Task<RolesList> Handle(RolesCRUDCommand request, CancellationToken cancellationToken)
        {
            return await _role.ManageRoles(request.rolesDTO);
        }
    }
}
