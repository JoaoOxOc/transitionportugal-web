import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { verifyTokenScopes } from '../../utils/jwt';

export const Authorized = (props) => {
  const { children } = props;
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if(!verifyTokenScopes(window.sessionStorage.getItem('accessToken'), props.scopes)) {
      router.push({
        pathname: '/403',
        query: { access: router.pathname },
      });
    }
    else {
      setVerified(true);
    }
  }, [router,router.isReady, props.scopes]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};

Authorized.propTypes = {
  children: PropTypes.node
};
