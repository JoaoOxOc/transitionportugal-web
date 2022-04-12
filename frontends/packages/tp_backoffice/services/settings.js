import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetSettings = async(settingsUri, searchDataJson) => {
    settingsUri += buildRouteQuery(searchDataJson);
    console.log(settingsUri);
    let response = await genericFetch(settingsUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.settings = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetSettingData = async(settingsUri) => {
    let response = await genericFetch(settingsUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.settings = {};
    }
    return response;
}

export const UpdateSettingData = async(settingsUri, settingDataJson) => {
    let response = await genericFetch(settingsUri, "PUT", window.sessionStorage.getItem('accessToken'),settingDataJson);
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "PUT", window.sessionStorage.getItem('accessToken'),settingDataJson);
    }
    else if (response.status == 404) {
        response.setting = {};
    }
    return response;
}