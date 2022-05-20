import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetClientApps = async(clientAppsUri, searchDataJson, bearerToken) => {
    clientAppsUri += buildRouteQuery(searchDataJson);
    console.log(clientAppsUri);
    let response = await genericFetch(clientAppsUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(clientAppsUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.clientApps = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetClientAppData = async(clientAppsUri, bearerToken) => {
    let response = await genericFetch(clientAppsUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(clientAppsUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.clientApp = {};
    }
    return response;
}

export const UpdateClientAppData = async(clientAppsUri, clientAppDataJson, bearerToken) => {
    let response = await genericFetch(clientAppsUri, "PUT", bearerToken,clientAppDataJson);
    if (response.requestAgain) {
        response = await genericFetch(clientAppsUri, "PUT", bearerToken,clientAppDataJson);
    }
    else if (response.status == 404) {
        response.clientApp = {};
    }
    return response;
}

export const CreateClientAppData = async(clientAppsUri, clientAppDataJson, bearerToken) => {
    let response = await genericFetch(clientAppsUri, "POST", bearerToken,clientAppDataJson);
    if (response.requestAgain) {
        response = await genericFetch(clientAppsUri, "POST", bearerToken,clientAppDataJson);
    }
    else if (response.status == 404) {
        response.clientApp = {};
    }
    return response;
}