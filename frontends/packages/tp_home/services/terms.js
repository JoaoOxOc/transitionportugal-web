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
        "ClientId": process.env.HOME_API_CLIENT_ID,
        "ClientAuthorization": process.env.HOME_API_CLIENT_SECRET
        };
        // TODO: replace constant lang with the browser 'userBrowserLanguage'?
        const res = await fetch(process.env.HOME_API_BASE_URL + "/terms/public/get" + "?langCode=" + "pt-pt", {
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