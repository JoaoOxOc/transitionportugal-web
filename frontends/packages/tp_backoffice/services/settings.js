import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetSettings = async(settingsUri, searchDataJson) => {
    settingsUri += buildRouteQuery(searchDataJson);
    console.log(settingsUri);
    let response = await genericFetch(settingsUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.settings = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetSettingData = async(settingsUri) => {
    let response = await genericFetch(settingsUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.settings = {};
    }
    return response;
}