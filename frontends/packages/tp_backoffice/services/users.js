import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetUsers = async(usersApiUri, searchDataJson) => {
    usersApiUri += buildRouteQuery(searchDataJson);
    let response = await genericFetch(usersApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.users = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetUserData = async(usersApiUri) => {
    let response = await genericFetch(usersApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.user = {};
    }
    return response;
}

export const UpdateUserData = async(usersApiUri, userDataJson) => {
    let response = await genericFetch(usersApiUri, "PUT", window.sessionStorage.getItem('accessToken'),userDataJson);
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "PUT", window.sessionStorage.getItem('accessToken'),userDataJson);
    }
    else if (response.status == 404) {
        response.user = {};
    }
    return response;
}

export const CreateUser = async(usersApiUri, userDataJson) => {
    let response = await genericFetch(usersApiUri, "POST", window.sessionStorage.getItem('accessToken'),userDataJson);
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "POST", window.sessionStorage.getItem('accessToken'),userDataJson);
    }
    else if (response.status == 404) {
        response.user = {};
    }
    return response;
}

export const ResendEmails = async(usersApiUri, userDataJson) => {
    let response = await genericFetch(usersApiUri, "POST", window.sessionStorage.getItem('accessToken'),userDataJson);
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "POST", window.sessionStorage.getItem('accessToken'),userDataJson);
    }
    else if (response.status == 404) {
        response.users = [];
    }
    return response;
}

export const ApproveUsers = async(usersApiUri, userDataJson) => {
    let response = await genericFetch(usersApiUri, "POST", window.sessionStorage.getItem('accessToken'),userDataJson);
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "POST", window.sessionStorage.getItem('accessToken'),userDataJson);
    }
    else if (response.status == 404) {
        response.users = [];
    }
    return response;
}

export const DeleteUsers = async(usersApiUri, userDataJson) => {
    let response = await genericFetch(usersApiUri, "DELETE", window.sessionStorage.getItem('accessToken'),userDataJson);
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "DELETE", window.sessionStorage.getItem('accessToken'),userDataJson);
    }
    else if (response.status == 404) {
        response.users = [];
    }
    return response;
}