// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import Providers from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

/**
 * gets user profile data
 * `accessToken`
 */
 async function getUserProfile(accessToken) {
  try {
    const apiUrl = process.env.AUTH_API_URL+"/user/profile";
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 
        'User-Agent': '*',
        "Content-Type": "application/json",
        "credentials": 'include',
        "ClientId": process.env.AUTH_API_CLIENT_ID,
        "ClientAuthorization": process.env.AUTH_API_CLIENT_SECRET,
        "Authorization": "bearer "+ accessToken
      }
    });

    if (!response.ok) {
      const resultErrorBody = await response.text();
      throw resultErrorBody;
    }
    
    const userData = await response.json();
    return userData;

  } catch (error) {
    console.log(error)

    return {
      error: "GetUserProfileError" + JSON.stringify({
        error: error
      }),
    }
  }
 }

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
 async function refreshAccessToken(token) {
  try {
    const apiUrl = process.env.AUTH_API_URL+"/user/refresh";
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        accessToken: token.user.token,
        refreshToken: token.user.refreshToken,
      }),
      headers: { 
        'User-Agent': '*',
        "Content-Type": "application/json",
        "credentials": 'include',
        "ClientId": process.env.AUTH_API_CLIENT_ID,
        "ClientAuthorization": process.env.AUTH_API_CLIENT_SECRET
      }
    })
    if (!response.ok) {
      const resultErrorBody = await response.text();
      throw resultErrorBody + token.user.refreshToken;
    }
    // The Credentials provider can only be used if JSON Web Tokens are enabled for sessions.
    // Users authenticated with the Credentials provider are not persisted in the database.
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: refreshedTokens.expiration * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError" + JSON.stringify({
        error: error
      }),
    }
  }
}

/**
 * Tutorials:
 * https://daily.dev/blog/authentication-in-nextjs
 * https://blog.logrocket.com/building-authorization-api-next-js/
 * https://www.bezkoder.com/react-hooks-jwt-auth/
 * https://next-auth.js.org/v3/providers/credentials
 * https://next-auth.js.org/v3/getting-started/example
 * https://github.com/nextauthjs/next-auth-example
 * https://blog.echobind.com/one-click-signup-in-next-js-with-next-auth-587d7d44496c
 * https://javascript.plainenglish.io/how-to-create-a-custom-sign-in-page-in-next-auth-1612dc17beb7
 * https://github.com/nextauthjs/next-auth/issues/1843
 */
 export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET
    // }),
    // Email({
    //   server: {
    //     port: 465,
    //     host: 'smtp.gmail.com',
    //     secure: true,
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    // Email provider needs database
    // database: process.env.DATABASE_URL,
    Credentials({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com', sessionId: 'c6216a1fc74d7320cf78eadd1645750600f133d9' }
          // return user;
          if (!credentials.username || !credentials.password) {
            throw new Error("CredentialsEmptyLoginError");
          }
          console.log('next auth req: ', req, credentials);
          const apiUrl = process.env.AUTH_API_URL+"/user/login";
          const res = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 
              "Accept": 'application/json, text/plain, */*',
              'User-Agent': '*',
              "Content-Type": "application/json",
              "credentials": 'include',
              "ClientId": process.env.AUTH_API_CLIENT_ID,
              "ClientAuthorization": process.env.AUTH_API_CLIENT_SECRET
            }
          })
          // if (!res.ok) {
          //   const resultErrorBody = await res.text();
          //   throw new Error("ApiError: " + resultErrorBody);
          // }
          // The Credentials provider can only be used if JSON Web Tokens are enabled for sessions.
          // Users authenticated with the Credentials provider are not persisted in the database.
          const user = await res.json();
    
          // If no error and we have user data, return it
          if (res.ok && user) {
            return user
          }
          // Return null if user data could not be retrieved
          return null
        }
    })
  ],
  // session: { 
  //   jwt: true, 
  //   //maxAge: 30 * 24 * 60 * 60 
  // }, // 30 days
  // https://next-auth.js.org/v3/configuration/callbacks
  callbacks:  {
    async signIn({user, account, profile}) {
      return true
    },
    // async redirect({url, baseUrl}) {
    //   // if (url.contains('auth/login/cover')) {
    //   //   return baseUrl;
    //   // }
    //   return baseUrl;
    // },
    async session({session, token, user}) {
      session.sessionId = token.sessionId;
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.scopes = token.scope;
      session.error = token.error;
      session.token = token;

      // const apiUrl = process.env.API_ENDPOINT+"odoorest/nextsession";
      // const res = await fetch(apiUrl, {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       "session": session,
      //       "user": token
      //     }),
      //     headers: { "Content-Type": "application/json" }
      // })
      // const resData = await res.json()
      return session
    },
    async jwt({token, user, account, profile, isNewUser}) {
      if (user && user.sessionId) {
        token.sessionId = user.sessionId
      }
      
      // const apiUrl = process.env.API_ENDPOINT+"odoorest/nextsession";
      // const res = await fetch(apiUrl, {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       "token": token,
      //       "user": user,
      //       "account": account,
      //       "profile": profile,
      //       "isNewUser": isNewUser
      //     }),
      //     headers: { "Content-Type": "application/json" }
      // })
      // const resData = await res.json()
      console.log(account, user)
      // Initial sign in
      if (account && user) {
        const userData = await getUserProfile(user.token);
        if (userData && !userData.error) {
          user.name = userData.userProfile.name;
          user.username = userData.userProfile.userName;
        }
        return {
          accessToken: user.token,
          accessTokenExpires: user.expiration * 1000,
          refreshToken: user.refreshToken,
          user
        }
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    }
  },
  pages: {
    signIn: '/auth/login/cover',
    //signOut: '/auth/signout',
    error: '/auth/login/cover', // Error code passed in query string as ?error=
    //verifyRequest: '/auth/verify-request', // (used for check email message)
    //newUser: null // If set, new users will be directed here on first sign in
  },
  theme: "auto"
}

export default NextAuth(authOptions);