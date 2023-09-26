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
    public class WorkCenterCRUDCommand : IRequest<WorkCenterList>
    {
        public WorkCenterDTO workCenterDTO { get; set; }
    }
    internal class WorkcenterCRUDHandler : IRequestHandler<WorkCenterCRUDCommand, WorkCenterList>
    {
        protected readonly IWorkCenter _workCenter;
      

        public WorkcenterCRUDHandler(IWorkCenter workCenter)
        {
            _workCenter = workCenter;
        }
        public async Task<WorkCenterList> Handle(WorkCenterCRUDCommand request, CancellationToken cancellationToken)
        {
            return await _workCenter.ManageWorkCenter(request.workCenterDTO);
        }
    }
}
