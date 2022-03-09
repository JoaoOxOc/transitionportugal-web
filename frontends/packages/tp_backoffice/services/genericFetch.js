export const genericFetch = async (apiUrl, method, bearerToken, bodyJson) => {
    const resultData = null;
    const headers = {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
        'Accept': '*/*',
        "Content-Type": "application/json",
        "ClientId": process.env.NEXT_PUBLIC_CLIENT_ID,
        "ClientAuthorization": process.env.NEXT_PUBLIC_CLIENT_SECRET
    };
    if (bearerToken) {
        headers["Authorization"] = "bearer "+ bearerToken;
    }
    try{
        const response = method != "GET" && method != "HEAD" ? await fetch(apiUrl, {
            method: method,
            headers: headers,
            body: JSON.stringify(bodyJson),
        })
        : await fetch(apiUrl, {
            method: method,
            headers: headers,
        });
        // .then(response => {
        //     console.log(response);
        //     if (!response.ok) {
        //         throw response;
        //     }
        //     return response;
        // })
        // .then(res => {
        //     console.log(res);
        //     return res.json();
        //  })
        //  .then(json => {
        //     console.log(json);
        //     resultData = json;
        //  });
        if (!response.ok) {
            throw response;
        }
        resultData = await response.json();
    }catch(err){
        resultData = err;
    }finally{
        return resultData;
    }
}

export const buildRouteQuery = (queryDataJson) => {
    let query = "?";
    if (queryDataJson) {
        const jsonProps = Object.keys(queryDataJson);
        const jsonPropsCount = jsonProps.length;
        for(let i = 0; i < jsonPropsCount; i++) {
            query += jsonProps[i] + "=" + queryDataJson[jsonProps[i]];
            if (i < jsonPropsCount - 1) {
                query += "&";
            }
        }
    }

    return query;
}