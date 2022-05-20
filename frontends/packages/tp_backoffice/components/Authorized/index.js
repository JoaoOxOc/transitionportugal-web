import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { verifyTokenScopes } from '../../utils/jwt';

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
