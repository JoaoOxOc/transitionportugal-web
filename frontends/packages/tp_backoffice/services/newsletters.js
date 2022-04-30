import { buildRouteQuery, genericFetch } from './genericFetch';

export const GetNewsletterSubscriptions = async(newsletterSubscriptionsApiUri, searchDataJson) => {
    newsletterSubscriptionsApiUri += buildRouteQuery(searchDataJson);
    console.log(newsletterSubscriptionsApiUri);
    let response = await genericFetch(newsletterSubscriptionsApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(newsletterSubscriptionsApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.subscriptions = [];
        response.totalCount = 0;
    }
    return response;
}

export const GetNewsletterSubscriptionData = async(newsletterSubscriptionsApiUri) => {
    let response = await genericFetch(newsletterSubscriptionsApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    if (response.requestAgain) {
        response = await genericFetch(newsletterSubscriptionsApiUri, "GET", window.localStorage.getItem('accessToken'),{});
    }
    else if (response.status == 404) {
        response.subscription = {};
    }
    return response;
}

export const UpdateNewsletterSubscriptionData = async(newsletterSubscriptionsApiUri, subscriptionDataJson) => {
    let response = await genericFetch(newsletterSubscriptionsApiUri, "PUT", window.localStorage.getItem('accessToken'),subscriptionDataJson);
    if (response.requestAgain) {
        response = await genericFetch(newsletterSubscriptionsApiUri, "PUT", window.localStorage.getItem('accessToken'),subscriptionDataJson);
    }
    else if (response.status == 404) {
        response.subscription = {};
    }
    return response;
}

export const CreateNewsletterSubscription = async(newsletterSubscriptionsApiUri, subscriptionDataJson) => {
    let response = await genericFetch(newsletterSubscriptionsApiUri, "POST", window.localStorage.getItem('accessToken'),subscriptionDataJson);
    if (response.requestAgain) {
        response = await genericFetch(newsletterSubscriptionsApiUri, "POST", window.localStorage.getItem('accessToken'),subscriptionDataJson);
    }
    else if (response.status == 404) {
        response.subscription = {};
    }
    return response;
}

export const DeleteNewsletterSubscription = async(newsletterSubscriptionsApiUri, subscriptionDataJson) => {
    let response = await genericFetch(newsletterSubscriptionsApiUri, "DELETE", window.localStorage.getItem('accessToken'),subscriptionDataJson);
    if (response.requestAgain) {
        response = await genericFetch(newsletterSubscriptionsApiUri, "DELETE", window.localStorage.getItem('accessToken'),subscriptionDataJson);
    }
    else if (response.status == 404) {
        response.subscriptionEmailRemoved = null;
    }
    return response;
}