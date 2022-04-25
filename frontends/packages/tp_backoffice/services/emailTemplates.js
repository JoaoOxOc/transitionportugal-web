import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetEmailTemplates = async(emailTemplatesApiUri, searchDataJson) => {
    emailTemplatesApiUri += buildRouteQuery(searchDataJson);
    console.log(emailTemplatesApiUri);
    let response = await genericFetch(emailTemplatesApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(emailTemplatesApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.templates = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetEmailTemplateData = async(emailTemplatesApiUri) => {
    let response = await genericFetch(emailTemplatesApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(emailTemplatesApiUri, "GET", window.sessionStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.template = {};
    }
    return response;
}

export const UpdateEmailTemplateData = async(emailTemplatesApiUri, templateJson) => {
    let response = await genericFetch(emailTemplatesApiUri, "PUT", window.sessionStorage.getItem('accessToken'),templateJson);
    if (response.requestAgain) {
        response = await genericFetch(emailTemplatesApiUri, "PUT", window.sessionStorage.getItem('accessToken'),templateJson);
    }
    else if (response.status == 404) {
        response.association = {};
    }
    return response;
}