import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetClientApps = async(clientAppsUri, searchDataJson) => {
    clientAppsUri += buildRouteQuery(searchDataJson);
    console.log(clientAppsUri);
    let response = await genericFetch(clientAppsUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(clientAppsUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.clientApps = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetClientAppData = async(clientAppsUri) => {
    let response = await genericFetch(clientAppsUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(clientAppsUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.clientApp = {};
    }
    return response;
}

export const UpdateClientAppData = async(clientAppsUri, clientAppDataJson) => {
    let response = await genericFetch(clientAppsUri, "PUT", window.localStorage.getItem('accessToken'),clientAppDataJson);
    if (response.requestAgain) {
        response = await genericFetch(clientAppsUri, "PUT", window.localStorage.getItem('accessToken'),clientAppDataJson);
    }
    else if (response.status == 404) {
        response.clientApp = {};
    }
    return response;
}

export const CreateClientAppData = async(clientAppsUri, clientAppDataJson) => {
    let response = await genericFetch(clientAppsUri, "POST", window.localStorage.getItem('accessToken'),clientAppDataJson);
    if (response.requestAgain) {
        response = await genericFetch(clientAppsUri, "POST", window.localStorage.getItem('accessToken'),clientAppDataJson);
    }
    else if (response.status == 404) {
        response.clientApp = {};
    }
    return response;
}