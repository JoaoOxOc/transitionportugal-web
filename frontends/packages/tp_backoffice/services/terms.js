import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetAllTermsRecords = async(termsApiUri, searchDataJson, bearerToken) => {
    termsApiUri += buildRouteQuery(searchDataJson);
    console.log(termsApiUri);
    let response = await genericFetch(termsApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(termsApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.termsRecords = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetTermsRecord = async(termsApiUri, bearerToken) => {
    let response = await genericFetch(termsApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(termsApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.termsRecord = {};
    }
    return response;
}

export const UpdateTermsRecord = async(termsApiUri, termsDataJson, bearerToken) => {
    let response = await genericFetch(termsApiUri, "PUT", bearerToken,termsDataJson);
    if (response.requestAgain) {
        response = await genericFetch(termsApiUri, "PUT", bearerToken,termsDataJson);
    }
    else if (response.status == 404) {
        response.termsId = -1;
        response.termsVersion = 0;
    }
    return response;
}

export const CreateTermsRecord = async(termsApiUri, termsDataJson, bearerToken) => {
    let response = await genericFetch(termsApiUri, "POST", bearerToken,termsDataJson);
    if (response.requestAgain) {
        response = await genericFetch(termsApiUri, "POST", bearerToken,termsDataJson);
    }
    else if (response.status == 404) {
        response.termsId = -1;
        response.termsVersion = 0;
    }
    return response;
}

export const CloneTermsRecord = async(termsApiUri, termsDataJson, bearerToken) => {
    let response = await genericFetch(termsApiUri, "POST", bearerToken,termsDataJson);
    if (response.requestAgain) {
        response = await genericFetch(termsApiUri, "POST", bearerToken,termsDataJson);
    }
    else if (response.status == 404) {
        response.termsId = -1;
        response.termsVersion = 0;
    }
    return response;
}