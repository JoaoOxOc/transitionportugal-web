import { getProviders, signIn } from "next-auth/react"
import { getCsrfToken } from "next-auth/react"
import { useRouter } from "next/router";
import Image from 'next/image'

import globalStyles from "./authglobalstyles.js";

import authStyles from "./auth.module.css";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

const SignInError = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return (
    <div className="error">
      <p>{errorMessage}</p>
    </div>
  );
};

export default function SignIn({ providers,csrfToken }) {
  const { error } = useRouter().query;
  console.log(providers, csrfToken)

    const setProviderLayout = (providerData) => {
      console.log(providerData);
      if (providerData.name == "Credentials") {
        return (
            <div key={providerData.name} className="provider">
                <hr/>
                <form action={providerData.callbackUrl} method="POST">
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  <div>
                    <label htmlFor="input-username-for-credentials-provider">Username</label>
                    <input name="username" id="input-username-for-credentials-provider" type="text"/>
                  </div>
                  <div>
                      <label htmlFor="input-password-for-credentials-provider">Password</label>
                      <input name="password" id="input-password-for-credentials-provider" type="password"/>
                  </div>
                  <button type="submit">Sign in with Credentials</button>
                </form>
            </div>
        )
      }
      else {
        return (
          <div key={providerData.name}>
            <div className="provider">
                  <button onClick={() => signIn(providerData.id)}>
                    Sign in with {providerData.name}
                  </button>
            </div>
          </div>
        )
      }
    }


    return (
      <div className={"__next-auth-theme-auto"}>
        <div className={"page " + authStyles["forny-container"]}>
          <div className={"signin "+ authStyles["forny-inner"]}>
            <div className={authStyles["forny-form"]}>
              <div className={"forny-logo"}>
                <a href="/">
                  <Image src='/static/images/logo/logotipo_transicaoportugal.svg' width="250" height="250"/>
                </a>
              </div>
              <style jsx global>
                {globalStyles}
              </style>
                {/* Error message */}
                {error && <SignInError error={error} />}
              {Object.values(providers).map((provider) => (
                setProviderLayout(provider)
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    //--background-img-url: url(${require('../../../public/static/images/logo/inner-circle.png')});
  const providers = await getProviders()
    const csrfToken = await getCsrfToken(context)
  return {
    props: { providers, csrfToken },
  }
}