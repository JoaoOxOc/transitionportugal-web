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

export const GetBannerData = async(bannersApiUri, bearerToken) => {
    let response = await genericFetch(bannersApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(bannersApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.banner = {};
    }
    return response;
}

export const UpdateBannerData = async(bannersApiUri, bannerDataJson, bearerToken) => {
    let response = await genericFetch(bannersApiUri, "PUT", bearerToken,bannerDataJson);
    if (response.requestAgain) {
        response = await genericFetch(bannersApiUri, "PUT", bearerToken,bannerDataJson);
    }
    else if (response.status == 404) {
        response.banner = {};
    }
    return response;
}

export const CreateBanner = async(bannersApiUri, bannerDataJson, bearerToken) => {
    let response = await genericFetch(bannersApiUri, "POST", bearerToken,bannerDataJson);
    if (response.requestAgain) {
        response = await genericFetch(bannersApiUri, "POST", bearerToken,bannerDataJson);
    }
    else if (response.status == 404) {
        response.banner = {};
    }
    return response;
}

export const ChangeStatusBanners = async(bannersApiUri, bannerDataJson, bearerToken) => {
    let response = await genericFetch(bannersApiUri, "PUT", bearerToken,bannerDataJson);
    if (response.requestAgain) {
        response = await genericFetch(bannersApiUri, "PUT", bearerToken,bannerDataJson);
    }
    else if (response.status == 404) {
        response.banners = [];
    }
    return response;
}

export const CloneBannerRecord = async(bannerApiUri, bannerDataJson, bearerToken) => {
    let response = await genericFetch(bannerApiUri, "POST", bearerToken,bannerDataJson);
    if (response.requestAgain) {
        response = await genericFetch(bannerApiUri, "POST", bearerToken,bannerDataJson);
    }
    else if (response.status == 404) {
        response.bannerId = -1;
        response.bannerVersion = 0;
    }
    return response;
}

export const DeleteBanners = async(bannersApiUri, bannerDataJson, bearerToken) => {
    let response = await genericFetch(bannersApiUri, "DELETE", bearerToken,bannerDataJson);
    if (response.requestAgain) {
        response = await genericFetch(bannersApiUri, "DELETE", bearerToken,bannerDataJson);
    }
    else if (response.status == 404) {
        response.banners = [];
    }
    return response;
}