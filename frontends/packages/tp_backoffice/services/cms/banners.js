import { buildRouteQuery, genericFetch } from '../genericFetch';

export const GetBanners = async(bannersApiUri, searchDataJson, bearerToken) => {
    bannersApiUri += buildRouteQuery(searchDataJson);
    let response = await genericFetch(bannersApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(bannersApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.banners = [];
        response.totalCount = 0;
    }
    return response;
}