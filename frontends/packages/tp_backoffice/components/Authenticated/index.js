import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from 'notistack';
import { Slide } from '@mui/material';

export const Authenticated = (props) => {
  const { children, session } = props;
  const auth = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // if (!auth.isAuthenticated || auth.redirectToLogin == true) {
    //   router.push({
    //     pathname: '/auth/login/cover',
    //     query: { backTo: router.asPath }
    //   });
    if (!session || !session.token || session.token.error) {
      router.push({
        pathname: '/auth/login/cover',
        query: { backTo: router.asPath }
      });
    } else {
      setVerified(true);
      if (auth.isReauthenticated) {
        enqueueSnackbar('You are successfully authenticated!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          },
          autoHideDuration: 2000,
          TransitionComponent: Slide
        });
      }
    }
  }, [router.isReady]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};

Authenticated.propTypes = {
  children: PropTypes.node
};