import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetSettings = async(settingsUri, searchDataJson, bearerToken) => {
    settingsUri += buildRouteQuery(searchDataJson);
    console.log(settingsUri);
    let response = await genericFetch(settingsUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.settings = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetSettingData = async(settingsUri, bearerToken) => {
    let response = await genericFetch(settingsUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.settings = {};
    }
    return response;
}

export const GetPublicSettings = async(settingsUri, searchDataJson) => {
    settingsUri += buildRouteQuery(searchDataJson);
    let response = await genericFetch(settingsUri, "GET", null,{});
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "GET", null,{});
    }
    else if (response.status == 404) {
        response.settings = [];
        response.totalCount = 0;
    }
    return response;
}

export const UpdateSettingData = async(settingsUri, settingDataJson, bearerToken) => {
    let response = await genericFetch(settingsUri, "PUT", bearerToken,settingDataJson);
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "PUT", bearerToken,settingDataJson);
    }
    else if (response.status == 404) {
        response.setting = {};
    }
    return response;
}

export const TestSendEmail = async(settingsUri, searchDataJson, bearerToken) => {
    settingsUri += buildRouteQuery(searchDataJson);
    console.log(settingsUri);
    let response = await genericFetch(settingsUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.settings = [];
        response.totalCount = 0;
    }
    return response;
}