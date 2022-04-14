import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetAllTermsRecords = async(termsApiUri, searchDataJson) => {
    termsApiUri += buildRouteQuery(searchDataJson);
    console.log(termsApiUri);
    let response = await genericFetch(termsApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(termsApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.termsRecords = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetTermsRecord = async(termsApiUri) => {
    let response = await genericFetch(termsApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(termsApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.termsRecord = {};
    }
    return response;
}

export const UpdateTermsRecord = async(termsApiUri, termsDataJson) => {
    let response = await genericFetch(termsApiUri, "PUT", window.sessionStorage.getItem('accessToken'),termsDataJson);
    if (response.requestAgain) {
        response = await genericFetch(termsApiUri, "PUT", window.sessionStorage.getItem('accessToken'),termsDataJson);
    }
    else if (response.status == 404) {
        response.termsId = -1;
        response.termsVersion = 0;
    }
    return response;
}

export const CreateTermsRecord = async(termsApiUri, termsDataJson) => {
    let response = await genericFetch(termsApiUri, "POST", window.sessionStorage.getItem('accessToken'),termsDataJson);
    if (response.requestAgain) {
        response = await genericFetch(termsApiUri, "POST", window.sessionStorage.getItem('accessToken'),termsDataJson);
    }
    else if (response.status == 404) {
        response.termsId = -1;
        response.termsVersion = 0;
    }
    return response;
}