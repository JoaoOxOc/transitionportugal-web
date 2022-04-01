using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommonLibrary.Extensions
{
    public class PermissionsHelper
    {
        /// <summary>
        /// Validates if the Role claim value is inside the permitted roles list
        /// </summary>
        /// <param name="userClaims">the user token extracted claims</param>
        /// <param name="permittedRoles">permitted roles list</param>
        /// <returns>true if user claim role is inside permitted roles list, false otherwise</returns>
        public static bool ValidateRoleClaimPermission(List<JwtClaim> userClaims, List<string> permittedRoles)
        {
            if (permittedRoles != null && permittedRoles.Count > 0 && userClaims != null && userClaims.Count > 0)
            {
                return permittedRoles.Contains(userClaims.Where(x => x.Claim == System.Security.Claims.ClaimTypes.Role).Single().Value);
            }
            else if (permittedRoles == null || permittedRoles.Count == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Validates if the Role claim value is inside the permitted roles list
        /// </summary>
        /// <param name="userRole">the user role</param>
        /// <param name="permittedRoles">permitted roles list</param>
        /// <returns>true if user claim role is inside permitted roles list, false otherwise</returns>
        public static bool ValidateRoleClaimPermission(string userRole, List<string> permittedRoles)
        {
            if (permittedRoles != null && permittedRoles.Count > 0 && !string.IsNullOrEmpty(userRole))
            {
                return permittedRoles.Contains(userRole);
            }
            else if (permittedRoles == null || permittedRoles.Count == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
