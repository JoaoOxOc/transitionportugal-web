import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetAssociations = async(associationsApiUri, searchDataJson) => {
    associationsApiUri += buildRouteQuery(searchDataJson);
    console.log(associationsApiUri);
    let response = await genericFetch(associationsApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.associations = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetAssociationData = async(associationsApiUri) => {
    let response = await genericFetch(associationsApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.associationData = {};
    }
    return response;
}

export const UpdateAssociationData = async(associationsApiUri, associationDataJson) => {
    let response = await genericFetch(associationsApiUri, "PUT", window.localStorage.getItem('accessToken'),associationDataJson);
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "PUT", window.localStorage.getItem('accessToken'),associationDataJson);
    }
    else if (response.status == 404) {
        response.association = {};
    }
    return response;
}

export const CreateAssociation = async(associationsApiUri, associationDataJson) => {
    let response = await genericFetch(associationsApiUri, "POST", window.localStorage.getItem('accessToken'),associationDataJson);
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "POST", window.localStorage.getItem('accessToken'),associationDataJson);
    }
    else if (response.status == 404) {
        response.association = {};
    }
    return response;
}

export const ResendEmails = async(associationsApiUri, associationDataJson) => {
    let response = await genericFetch(associationsApiUri, "POST", window.localStorage.getItem('accessToken'),associationDataJson);
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "POST", window.localStorage.getItem('accessToken'),associationDataJson);
    }
    else if (response.status == 404) {
        response.associations = [];
    }
    return response;
}

export const ApproveAssociations = async(associationsApiUri, associationDataJson) => {
    let response = await genericFetch(associationsApiUri, "POST", window.localStorage.getItem('accessToken'),associationDataJson);
    if (response.requestAgain) {
        response = await genericFetch(associationsApiUri, "POST", window.localStorage.getItem('accessToken'),associationDataJson);
    }
    else if (response.status == 404) {
        response.associations = [];
    }
    return response;
}