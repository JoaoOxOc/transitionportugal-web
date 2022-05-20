import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetAssociations = async(associationsApiUri, searchDataJson, bearerToken) => {
    associationsApiUri += buildRouteQuery(searchDataJson);
    let response = await genericFetch(associationsApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.associations = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetAssociationData = async(associationsApiUri, bearerToken) => {
    let response = await genericFetch(associationsApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.associationData = {};
    }
    return response;
}

export const UpdateAssociationData = async(associationsApiUri, associationDataJson, bearerToken) => {
    let response = await genericFetch(associationsApiUri, "PUT", bearerToken,associationDataJson);
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "PUT", bearerToken,associationDataJson);
    }
    else if (response.status == 404) {
        response.association = {};
    }
    return response;
}

export const CreateAssociation = async(associationsApiUri, associationDataJson, bearerToken) => {
    let response = await genericFetch(associationsApiUri, "POST", bearerToken,associationDataJson);
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "POST", bearerToken,associationDataJson);
    }
    else if (response.status == 404) {
        response.association = {};
    }
    return response;
}

export const ResendEmails = async(associationsApiUri, associationDataJson, bearerToken) => {
    let response = await genericFetch(associationsApiUri, "POST", bearerToken,associationDataJson);
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "POST", bearerToken,associationDataJson);
    }
    else if (response.status == 404) {
        response.associations = [];
    }
    return response;
}

export const ApproveAssociations = async(associationsApiUri, associationDataJson, bearerToken) => {
    let response = await genericFetch(associationsApiUri, "POST", bearerToken,associationDataJson);
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "POST", bearerToken,associationDataJson);
    }
    else if (response.status == 404) {
        response.associations = [];
    }
    return response;
}

export const DeleteAssociations = async(associationsApiUri, associationDataJson, bearerToken) => {
    let response = await genericFetch(associationsApiUri, "DELETE", bearerToken,associationDataJson);
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "DELETE", bearerToken,associationDataJson);
    }
    else if (response.status == 404) {
        response.associations = [];
    }
    return response;
}