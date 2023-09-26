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
    public class SubRolesCommand : IRequest<SubRolesList>
    {
        public SubRolesDTO subRolesDTO { get; set; }
    }
    internal class SubRolesHandler : IRequestHandler<SubRolesCommand, SubRolesList>
    {
        protected readonly ISubRole _subRole;

        public SubRolesHandler(ISubRole subRole)
        {
            _subRole = subRole;
        }
        public async Task<SubRolesList> Handle(SubRolesCommand request, CancellationToken cancellationToken)
        {
            return await _subRole.SubRolesMapping(request.subRolesDTO);
        }
    }
}
