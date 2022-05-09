import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetScopes = async(scopesApiUri, searchDataJson, bearerToken) => {
    scopesApiUri += buildRouteQuery(searchDataJson);
    console.log(scopesApiUri);
    let response = await genericFetch(scopesApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(scopesApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.scopes = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetScopeData = async(scopesApiUri, bearerToken) => {
    let response = await genericFetch(scopesApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(scopesApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.scope = {};
        response.scopeRoles = {};
    }
    return response;
}

export const UpdateScopeData = async(scopesApiUri, scopeDataJson, bearerToken) => {
    let response = await genericFetch(scopesApiUri, "PUT", bearerToken,scopeDataJson);
    if (response.requestAgain) {
        response = await genericFetch(scopesApiUri, "PUT", bearerToken,scopeDataJson);
    }
    else if (response.status == 404) {
        response.scope = {};
    }
    return response;
}

export const CreateScope = async(scopesApiUri, scopeDataJson, bearerToken) => {
    let response = await genericFetch(scopesApiUri, "POST", bearerToken,scopeDataJson);
    if (response.requestAgain) {
        response = await genericFetch(scopesApiUri, "POST", bearerToken,scopeDataJson);
    }
    else if (response.status == 404) {
        response.scope = {};
    }
    return response;
}