import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { verifyTokenScopes } from '../../utils/jwt';
// import { setClientCookie, getClientCookie } from '../../services/cookies';
// import { strapiAuth } from '../../services/singleSignOn';

export const Authorized = (props) => {
  const { children, session } = props;
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if(!verifyTokenScopes(session.accessToken, props.scopes)) {
      router.push({
        pathname: '/403',
        query: { access: router.pathname },
      });
    }
    else {
      // if (props.scopes.contains("cms.write")) {
      //   getClientCookie("strapi").then((result)=> {
      //     if (!result) {
      //       // for local strapi users: http://localhost:1337/auth/local - https://medium.com/codingthesmartway-com-blog/getting-started-with-strapi-ep3-authentication-8dfe8cb0b171
      //       strapiAuth(process.env.NEXT_PUBLIC_CMS_BASE_URL,process.env.CMS_INTEGRATION_USER,process.env.CMS_INTEGRATION_USER_PASSWORD).then((strapiResult) => {
      //         //TODO: set the correct cookie name and value
      //         setClientCookie("strapi", strapiResult.jwt,
      //         {
      //           domain: process.env.NEXT_PUBLIC_CMS_BASE_URL,
      //           maxAge: 2147483647,
      //           path: '/',
      //         });
      //       });
      //     }
      //   })
      // }
      setVerified(true);
    }
  }, [router,router.isReady, session.accessToken, props.scopes]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};

Authorized.propTypes = {
  children: PropTypes.node
};
