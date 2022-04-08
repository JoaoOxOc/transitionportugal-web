import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetScopes = async(scopesApiUri, searchDataJson) => {
    scopesApiUri += buildRouteQuery(searchDataJson);
    console.log(scopesApiUri);
    let response = await genericFetch(scopesApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(scopesApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.scopes = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetScopeData = async(scopesApiUri) => {
    let response = await genericFetch(scopesApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(scopesApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.scope = {};
        response.scopeRoles = {};
    }
    return response;
}

export const UpdateScopeData = async(scopesApiUri, scopeDataJson) => {
    let response = await genericFetch(scopesApiUri, "PUT", window.localStorage.getItem('accessToken'),scopeDataJson);
    if (response.requestAgain) {
        response = await genericFetch(scopesApiUri, "PUT", window.localStorage.getItem('accessToken'),scopeDataJson);
    }
    else if (response.status == 404) {
        response.scope = {};
    }
    return response;
}

export const CreateScope = async(scopesApiUri, scopeDataJson) => {
    let response = await genericFetch(scopesApiUri, "POST", window.localStorage.getItem('accessToken'),scopeDataJson);
    if (response.requestAgain) {
        response = await genericFetch(scopesApiUri, "POST", window.localStorage.getItem('accessToken'),scopeDataJson);
    }
    else if (response.status == 404) {
        response.scope = {};
    }
    return response;
}