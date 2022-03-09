import { genericFetch } from './genericFetch';

export const GetSettings = async(settingsUri) => {
    let response = await genericFetch(settingsUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(settingsUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    return response;
}