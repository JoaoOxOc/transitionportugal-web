import { GetPublicAssociationTypes } from '../services/associationTypes';

export const getPublicAssociationTypesAsync = async() => {
    let associationTypesGetResponse = null;
    let associationTypesGetResponseError = null;
    try {
      associationTypesGetResponse = await GetPublicAssociationTypes(process.env.NEXT_PUBLIC_API_BASE_URL + "/associationTypes/public/get");

      if (associationTypesGetResponse.status) {
        associationTypesGetResponseError = {status: associationTypesGetResponse.status, statusText: associationTypesGetResponse.statusText };
      }
      else if (associationTypesGetResponse.errno === "ENOTFOUND" || associationTypesGetResponse.errno === "ECONNREFUSED") {
        associationTypesGetResponseError = { message: 'FetchError', status: 404, statusText: associationTypesGetResponse.errno };
      }
    } catch (err) {
      associationTypesGetResponseError = {status: err.status, statusText: err.statusText };
    }
    const associationTypes = associationTypesGetResponseError ? { associationTypesError: associationTypesGetResponseError } : {associationTypes: associationTypesGetResponse.associationTypes};

    return associationTypes;
}