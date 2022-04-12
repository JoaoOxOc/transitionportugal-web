import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetRoles = async(rolesApiUri, searchDataJson) => {
    rolesApiUri += buildRouteQuery(searchDataJson);
    console.log(rolesApiUri);
    let response = await genericFetch(rolesApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(rolesApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.roles = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetRoleData = async(rolesApiUri) => {
    let response = await genericFetch(rolesApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(rolesApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.role = {};
    }
    return response;
}

export const UpdateRoleData = async(rolesApiUri, roleDataJson) => {
    let response = await genericFetch(rolesApiUri, "PUT", window.sessionStorage.getItem('accessToken'),roleDataJson);
    if (response.requestAgain) {
        response = await genericFetch(rolesApiUri, "PUT", window.sessionStorage.getItem('accessToken'),roleDataJson);
    }
    else if (response.status == 404) {
        response.role = {};
        response.scopes = {};
    }
    return response;
}

export const CreateRole = async(rolesApiUri, roleDataJson) => {
    let response = await genericFetch(rolesApiUri, "POST", window.sessionStorage.getItem('accessToken'),roleDataJson);
    if (response.requestAgain) {
        response = await genericFetch(rolesApiUri, "POST", window.sessionStorage.getItem('accessToken'),roleDataJson);
    }
    else if (response.status == 404) {
        response.role = {};
        response.scopes = {};
    }
    return response;
}