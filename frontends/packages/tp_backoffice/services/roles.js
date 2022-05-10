import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetRoles = async(rolesApiUri, searchDataJson, bearerToken) => {
    rolesApiUri += buildRouteQuery(searchDataJson);
    console.log(rolesApiUri);
    let response = await genericFetch(rolesApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(rolesApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.roles = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetRoleData = async(rolesApiUri, bearerToken) => {
    let response = await genericFetch(rolesApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(rolesApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.role = {};
    }
    return response;
}

export const UpdateRoleData = async(rolesApiUri, roleDataJson, bearerToken) => {
    let response = await genericFetch(rolesApiUri, "PUT", bearerToken,roleDataJson);
    if (response.requestAgain) {
        response = await genericFetch(rolesApiUri, "PUT", bearerToken,roleDataJson);
    }
    else if (response.status == 404) {
        response.role = {};
        response.scopes = {};
    }
    return response;
}

export const CreateRole = async(rolesApiUri, roleDataJson, bearerToken) => {
    let response = await genericFetch(rolesApiUri, "POST", bearerToken,roleDataJson);
    if (response.requestAgain) {
        response = await genericFetch(rolesApiUri, "POST", bearerToken,roleDataJson);
    }
    else if (response.status == 404) {
        response.role = {};
        response.scopes = {};
    }
    return response;
}