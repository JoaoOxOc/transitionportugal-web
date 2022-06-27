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

export const GetPublicTerms = async(browserLanguage) => {
    let termsProps = {};
    try {
        const headers = {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
        'Accept': '*/*',
        "Content-Type": "application/json",
        "credentials": 'include',
        "ClientId": process.env.AUTH_API_CLIENT_ID,
        "ClientAuthorization": process.env.AUTH_API_CLIENT_SECRET
        };
        // TODO: replace constant lang with the browser 'userBrowserLanguage'?
        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/terms/public/get" + "?langCode=" + "pt-pt", {
        method: "GET",
        resolveWithFullResponse: true,
        headers: headers,
        });

        if (!res.ok){
        const resultErrorBody = await res.text();
        termsProps = {
            error: resultErrorBody, statusText: res.statusText
        }
        }
        const data = await res.json();

        if (!data || !data.termsRecord) {
        termsProps = {
            termsnotFound: true
        }
        }
    
        termsProps = {
        terms: data.termsRecord
        }
    }
    catch(ex) {
        termsProps = {
            termsnotFound: true,
            error: ex.message
        }
    }
    return termsProps;
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

export const ActivateTermsRecord = async(termsApiUri, termsDataJson, bearerToken) => {
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