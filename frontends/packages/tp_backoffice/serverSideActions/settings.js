import { GetPublicSettings } from '../services/settings';

export const getPublicUserSettings = async() => {
    let settingsGetResponse = null;
    let settingsGetResponseError = null;
    try {
        settingsGetResponse = await GetPublicSettings(process.env.NEXT_PUBLIC_API_BASE_URL + "/usersettings/public/get", {
          searchText:'',
          offset: 1,
          limit: 10,
          sort: "Value",
          sortDirection: "asc"
        });
  
        if (settingsGetResponse.status) {
          settingsGetResponseError = {status: settingsGetResponse.status, statusText: settingsGetResponse.statusText };
        }
        else if (settingsGetResponse.errno === "ENOTFOUND" || settingsGetResponse.errno === "ECONNREFUSED") {
          settingsGetResponseError = { message: 'FetchError', status: 404, statusText: settingsGetResponse.errno };
        }
      } catch (err) {
        settingsGetResponseError = {status: err.status, statusText: err.statusText };
      }
      const settings = settingsGetResponseError ? { settingsError: settingsGetResponseError } : {settings: settingsGetResponse};
      return settings;
}