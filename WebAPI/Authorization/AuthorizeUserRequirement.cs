using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Authorization
{
    internal class AuthorizeUserRequirement : IAuthorizationRequirement
    {
        public int Age { get; private set; }

        public AuthorizeUserRequirement(int age) { Age = age; }
    }
}
