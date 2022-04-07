﻿using CommonLibrary.Enums;
using System.Linq.Expressions;
using UserService.Entities;
using UserService.Models;
using UserService.Services.Database;

namespace UserService.Services.UserManager
{
    public class RoleScopeManager : IRoleScopeManager
    {
        private readonly IUnitOfWork _uow;
        public RoleScopeManager(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public List<RoleScope> ReplaceRoleScopes(string roleId, List<ScopeModel> scopes)
        {
            List<RoleScope> roleScopes = new List<RoleScope>();

            foreach (var scope in scopes)
            {
                if (scope.ScopeId.HasValue)
                {
                    roleScopes.Add(new RoleScope
                    {
                        RoleId = roleId,
                        ScopeId = scope.ScopeId.Value
                    });
                }
            }

            Expression<Func<RoleScope, bool>> scopeFilter = (x => x.RoleId == roleId);
            if (roleScopes != null && roleScopes.Count > 0)
            {
                var currentScopes = _uow.RoleScopeRepository.Get(null, null, scopeFilter, "Id", SortDirection.Ascending, string.Empty);
                if (currentScopes != null && currentScopes.Count > 0)
                {
                    _uow.RoleScopeRepository.Delete(roleScopes);
                    _uow.Save();
                }

                _uow.RoleScopeRepository.Add(roleScopes);
                _uow.Save();
            }
            return _uow.RoleScopeRepository.Get(null, null, scopeFilter, "Scope.ScopeName", SortDirection.Ascending, "Scope");
        }
    }
}
