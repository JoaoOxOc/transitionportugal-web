import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetMailingLists = async(mailingListsApiUri, searchDataJson, bearerToken) => {
    let response = await genericFetch(mailingListsApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(mailingListsApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.mailingLists = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetNewsletterSubscriptions = async(newsletterSubscriptionsApiUri, searchDataJson, bearerToken) => {
    newsletterSubscriptionsApiUri += buildRouteQuery(searchDataJson);
    console.log(newsletterSubscriptionsApiUri);
    let response = await genericFetch(newsletterSubscriptionsApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(newsletterSubscriptionsApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.subscriptions = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetNewsletterSubscriptionData = async(newsletterSubscriptionsApiUri, bearerToken) => {
    let response = await genericFetch(newsletterSubscriptionsApiUri, "GET", bearerToken,{});
    if (response.requestAgain) {
        response = await genericFetch(newsletterSubscriptionsApiUri, "GET", bearerToken,{});
    }
    else if (response.status == 404) {
        response.subscription = {};
    }
    return response;
}

export const UpdateNewsletterSubscriptionData = async(newsletterSubscriptionsApiUri, subscriptionDataJson, bearerToken) => {
    let response = await genericFetch(newsletterSubscriptionsApiUri, "PUT", bearerToken,subscriptionDataJson);
    if (response.requestAgain) {
        response = await genericFetch(newsletterSubscriptionsApiUri, "PUT", bearerToken,subscriptionDataJson);
    }
    else if (response.status == 404) {
        response.subscription = {};
    }
    return response;
}

export const CreateNewsletterSubscription = async(newsletterSubscriptionsApiUri, subscriptionDataJson, bearerToken) => {
    let response = await genericFetch(newsletterSubscriptionsApiUri, "POST", bearerToken,subscriptionDataJson);
    if (response.requestAgain) {
        response = await genericFetch(newsletterSubscriptionsApiUri, "POST", bearerToken,subscriptionDataJson);
    }
    else if (response.status == 404) {
        response.subscription = {};
    }
    return response;
}

export const DeleteNewsletterSubscription = async(newsletterSubscriptionsApiUri, subscriptionDataJson, bearerToken) => {
    let response = await genericFetch(newsletterSubscriptionsApiUri, "DELETE", bearerToken,subscriptionDataJson);
    if (response.requestAgain) {
        response = await genericFetch(newsletterSubscriptionsApiUri, "DELETE", bearerToken,subscriptionDataJson);
    }
    else if (response.status == 404) {
        response.subscriptionEmailRemoved = null;
    }
    return response;
}