import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetSettings = async(settingsUri, searchDataJson) => {
    settingsUri += buildRouteQuery(searchDataJson);
    console.log(settingsUri);
    let response = await genericFetch(settingsUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    return response;
}