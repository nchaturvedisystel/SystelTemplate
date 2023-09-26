using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WebAPI.Filter
{
    public class ValidationFilterAttribute : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                throw new ValidationException(context.ModelState);
            }
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }


    public class ValidationException : Exception
    {
        public ValidationException() : base("One or more failures occurred.")
        {
            Errors = new List<string>();
        }
        public List<string> Errors { get; }
        public ValidationException(ModelStateDictionary failures)
            : this()
        {
            var list = failures.Values.ToList();
            foreach (var failure in list)
            {
                foreach(var error in failure.Errors)
                {
                    Errors.Add(error.ErrorMessage);
                }
            }
        }

    }
}
