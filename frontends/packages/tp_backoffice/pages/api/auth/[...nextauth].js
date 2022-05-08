// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import Providers from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

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
export default NextAuth({
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET
    // }),
    // Providers.Email({
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
          console.log('next auth req: ', req, credentials);
          const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL+"/user/login";
          const res = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 
              "Content-Type": "application/json",
              "credentials": 'include',
              "ClientId": process.env.AUTH_API_CLIENT_ID,
              "ClientAuthorization": process.env.AUTH_API_CLIENT_SECRET
            }
          })
          // The Credentials provider can only be used if JSON Web Tokens are enabled for sessions.
          // Users authenticated with the Credentials provider are not persisted in the database.
          const user = await res.json()
    
          // If no error and we have user data, return it
          if (res.ok && user) {
            // TODO: add authentication logic for microfrontend, for example session cookie (use user.sessionId)
            return user
          }
          // Return null if user data could not be retrieved
          return null
        }
    })
  ],
  session: { 
    jwt: true, 
    maxAge: 30 * 24 * 60 * 60 
  }, // 30 days
  // https://next-auth.js.org/v3/configuration/callbacks
  callbacks:  {
    async signIn(user, account, profile) {
      return true
    },
    async redirect(url, baseUrl) {
      return baseUrl
    },
    async session(session, token) {
      session.sessionId = token.sessionId;
      const apiUrl = process.env.API_ENDPOINT+"odoorest/nextsession";
      const res = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify({
            "session": session,
            "user": token
          }),
          headers: { "Content-Type": "application/json" }
      })
      const resData = await res.json()
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
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
      return token
    }
  },
  pages: {
    signIn: '/auth/login/nextauth',
    //signOut: '/auth/signout',
    error: '/auth/login/nextauth', // Error code passed in query string as ?error=
    //verifyRequest: '/auth/verify-request', // (used for check email message)
    //newUser: null // If set, new users will be directed here on first sign in
  },
  theme: "auto"
})