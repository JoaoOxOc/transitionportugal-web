import Head from 'next/head';
import Router from 'next/router';
import {ErrorBoundary} from 'react-error-boundary';
import {ErrorBoundaryFallback, myErrorHandler} from '../services/ErrorBoundaryFallback';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from '../theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
// import { appWithTranslation } from 'next-i18next';
import { SidebarProvider } from '../contexts/SidebarContext';
import '../utils/chart';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import Loader from '../components/Loader';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useScrollTop from '../hooks/useScrollTop';
import { SnackbarProvider } from 'notistack';
import { AuthConsumer, AuthProvider } from '../contexts/JWTAuthContext';
import { SessionProvider, Provider } from "next-auth/react"

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  useScrollTop();

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Tokyo White NextJS Javascript Admin Dashboard</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
        <ReduxProvider store={store}>
          <SessionProvider session={pageProps.session} basePath="/admin/api/auth" refetchInterval={4 * 60}>
            <SidebarProvider>
              <ThemeProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <AuthProvider>
                    <SnackbarProvider
                      maxSnack={6}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                    >
                      <CssBaseline />
                      <AuthConsumer>
                        {(auth) =>
                          !auth.isInitialized ? (
                            <Loader />
                          ) : (
                              
                              getLayout(
                                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onError={myErrorHandler}>
                                    <Component {...pageProps} />
                                </ErrorBoundary>
                              )
                          )
                        }
                      </AuthConsumer>
                    </SnackbarProvider>
                  </AuthProvider>
                </LocalizationProvider>
              </ThemeProvider>
            </SidebarProvider>
          </SessionProvider>
        </ReduxProvider>
    </CacheProvider>
  );
}

export default MyApp;
