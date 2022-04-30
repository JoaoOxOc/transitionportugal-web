export const genericFetch = async (apiUrl, method, bearerToken, bodyJson) => {
    let resultData = null;
    let resultErrorBody = null;
    const headers = {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
        'Accept': '*/*',
        "Content-Type": "application/json",
        "credentials": 'include',
        "ClientId": process.env.NEXT_PUBLIC_CLIENT_ID,
        "ClientAuthorization": process.env.NEXT_PUBLIC_CLIENT_SECRET
    };
    if (bearerToken) {
        headers["Authorization"] = "bearer "+ bearerToken;
    }
    try{
        const response = method != "GET" && method != "HEAD" ? await fetch(apiUrl, {
            method: method,
            resolveWithFullResponse: true,
            headers: headers,
            body: JSON.stringify(bodyJson),
        })
        : await fetch(apiUrl, {
            method: method,
            resolveWithFullResponse: true,
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
            resultErrorBody = await response.text();
            resultData = {};
            resultData.totalCount = 0;
            resultData.responseBody = resultErrorBody;
            throw response;
        }
        resultData = await response.json();
        resultData.totalCount = response.headers.get('x-total-count');
    }catch(err){
        resultData = err;
        console.log(resultErrorBody)
        if (err.status == 400 && resultErrorBody == "Invalid access token or refresh token") {
            resultData.redirectLogin = true;
        }
        else if (bearerToken && err.status == 401) {
            const refreshToken = window.localStorage.getItem('refreshToken');
            if (refreshToken) {
              const refreshedTokenData = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/refresh", "POST", null,
              {
                accessToken: bearerToken,
                refreshToken: refreshToken,
              });
              if (refreshedTokenData.accessToken) {
                  localStorage.setItem('accessToken', refreshedTokenData.accessToken);
                  localStorage.setItem('refreshToken', refreshedTokenData.refreshToken);
                  resultData.requestAgain = true;
              }
              else {
                resultData.redirectLogin = refreshedTokenData.redirectLogin;
              }
            }
            else {
                resultData.redirectLogin = true;
            }
        }
        else {
            try {
                resultData.responseBody = JSON.parse(resultErrorBody);
            }
            catch(ex) {
                resultData.responseBody = resultErrorBody;
            }
        }
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