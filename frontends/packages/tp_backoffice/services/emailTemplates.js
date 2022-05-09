import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetEmailTemplates = async(emailTemplatesApiUri, searchDataJson,bearerToken) => {
    emailTemplatesApiUri += buildRouteQuery(searchDataJson);
    console.log(emailTemplatesApiUri);
    let response = await genericFetch(emailTemplatesApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(emailTemplatesApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.templates = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetEmailTemplateData = async(emailTemplatesApiUri,bearerToken) => {
    let response = await genericFetch(emailTemplatesApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(emailTemplatesApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.template = {};
    }
    return response;
}

export const UpdateEmailTemplateData = async(emailTemplatesApiUri, templateJson,bearerToken) => {
    let response = await genericFetch(emailTemplatesApiUri, "PUT", bearerToken,templateJson);
    if (response.requestAgain) {
        response = await genericFetch(emailTemplatesApiUri, "PUT", bearerToken,templateJson);
    }
    else if (response.status == 404) {
        response.association = {};
    }
    return response;
}