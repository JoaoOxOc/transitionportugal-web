import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetUsers = async(usersApiUri, searchDataJson, bearerToken) => {
    usersApiUri += buildRouteQuery(searchDataJson);
    let response = await genericFetch(usersApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.users = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetUserData = async(usersApiUri, bearerToken) => {
    let response = await genericFetch(usersApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.user = {};
    }
    return response;
}

export const UpdateUserData = async(usersApiUri, userDataJson, bearerToken) => {
    let response = await genericFetch(usersApiUri, "PUT", bearerToken,userDataJson);
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "PUT", bearerToken,userDataJson);
    }
    else if (response.status == 404) {
        response.user = {};
    }
    return response;
}

export const CreateUser = async(usersApiUri, userDataJson, bearerToken) => {
    let response = await genericFetch(usersApiUri, "POST", bearerToken,userDataJson);
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "POST", bearerToken,userDataJson);
    }
    else if (response.status == 404) {
        response.user = {};
    }
    return response;
}

export const ResendEmails = async(usersApiUri, userDataJson, bearerToken) => {
    let response = await genericFetch(usersApiUri, "POST", bearerToken,userDataJson);
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "POST", bearerToken,userDataJson);
    }
    else if (response.status == 404) {
        response.users = [];
    }
    return response;
}

export const ApproveUsers = async(usersApiUri, userDataJson, bearerToken) => {
    let response = await genericFetch(usersApiUri, "POST", bearerToken,userDataJson);
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "POST", bearerToken,userDataJson);
    }
    else if (response.status == 404) {
        response.users = [];
    }
    return response;
}

export const DeleteUsers = async(usersApiUri, userDataJson, bearerToken) => {
    let response = await genericFetch(usersApiUri, "DELETE", bearerToken,userDataJson);
    if (response.requestAgain) {
        response = await genericFetch(usersApiUri, "DELETE", bearerToken,userDataJson);
    }
    else if (response.status == 404) {
        response.users = [];
    }
    return response;
}