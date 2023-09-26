using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.Filter;

namespace WebAPI.Controllers
{
    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}
