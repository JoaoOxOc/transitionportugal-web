import { parseCookies, setCookie, destroyCookie } from 'nookies';


const setClientCookie = (cookieIdentifier, cookieValue, cookieOptions) => {
    setCookie(null, cookieIdentifier, cookieValue, cookieOptions);
}

const setServerCookie = (pageContext, cookieIdentifier, cookieValue, cookieOptions) => {
    setCookie(pageContext, cookieIdentifier, cookieValue, cookieOptions);
}

const getClientCookies = () => {
    return parseCookies();
}

const getServerCookies = (pageContext) => {
    return parseCookies(pageContext);
}

const getClientCookie = (cookieIdentifier) => {
    const cookies = parseCookies();
    for (cookie in cookies) {
        if (cookie.name == cookieIdentifier) {
            return cookie;
        }
    }
    return null;
}

const destroyClientCookies = (cookieIdentifier) => {
    return destroyCookie(null, cookieIdentifier);
}

const destroyServerCookies = (pageContext, cookieIdentifier) => {
    return destroyCookie(pageContext, cookieIdentifier);
}

export {setClientCookie,setServerCookie,getClientCookies,getServerCookies, getClientCookie, destroyClientCookies, destroyServerCookies}
