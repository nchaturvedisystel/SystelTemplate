using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Authorization
{
    // This attribute derives from the [Authorize] attribute, adding 
    // the ability for a user to specify an 'age' paratmer. Since authorization
    // policies are looked up from the policy provider only by string, this
    // authorization attribute creates is policy name based on a constant prefix
    // and the user-supplied age parameter. A custom authorization policy provider
    // (`AuthorizeUserPolicyProvider`) can then produce an authorization policy with 
    // the necessary requirements based on this policy name.
    internal class AuthorizeUserAttribute : AuthorizeAttribute
    {
        const string POLICY_PREFIX = "AuthorizeUser";

        public AuthorizeUserAttribute() => Age = 10;

        // Get or set the Age property by manipulating the underlying Policy property
        public int Age
        {
            get
            {
                if (int.TryParse(Policy.Substring(POLICY_PREFIX.Length), out var age))
                {
                    return age;
                }
                return default(int);
            }
            set
            {
                Policy = $"{POLICY_PREFIX}{value.ToString()}";
            }
        }
    }
}