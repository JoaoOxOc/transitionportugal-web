import {
  Box,
  Card,
  Tooltip,
  Typography,
  Container,
  Alert,
  styled
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { Guest } from '../../../../components/Guest';
import { LoginAuth0 } from '../../../../content/Auth/Login/LoginAuth0';
import { LoginFirebaseAuth } from '../../../../content/Auth/Login/LoginFirebaseAuth';
import { LoginJWT } from '../../../../content/Auth/Login/LoginJWT';
import { LoginAmplify } from '../../../../content/Auth/Login/LoginAmplify';
import BaseLayout from '../../../../layouts/BaseLayout';
import Link from '../../../../components/Link';
import { useRouter } from 'next/router';

import { i18nextLogin } from "@transitionpt/translations";
import Logo from '../../../../components/Logo';
import Scrollbar from '../../../../components/Scrollbar';

const icons = {
  CircularEconomy: '/static/images/logo/circular-economy-icon-green.png',
  InnerTransition: '/static/images/logo/inner-transition.png',
  InnerCircle: '/static/images/logo/inner-circle.png',
  TransitionTowns: '/static/images/logo/transition-towns.png'
};

const Content = styled(Box)(
  () => `
    display: flex;
    flex: 1;
    width: 100%;
`
);

const MainContent = styled(Box)(
  ({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '0 0 0 0'
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 0 0 440px'
  },
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  minWidth: '500px'
  })
);

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background: ${theme.colors.alpha.white[100]};
    width: 440px;
`
);

const SidebarContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(6)};
`
);

const CardImg = styled(Card)(
  ({ theme }) => `
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px solid ${theme.colors.alpha.black[10]};
    transition: ${theme.transitions.create(['border'])};
    position: absolute;

    &:hover {
      border-color: ${theme.colors.primary.main};
    }
`
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(28)};
`
);

function LoginCover() {
  const { method } = useAuth();
  const { t } = i18nextLogin;
  const [currentLang, setLang] = useState("pt");
  i18nextLogin.changeLanguage(currentLang);
  console.log("env API URL: ",process.env.NEXT_PUBLIC_API_BASE_URL, process.env.NEXT_PUBLIC_HOME_URL);

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  const router = useRouter();
  const { demo } = router.query;

  return (
    <>
      <Head>
        <title>{t('LABELS.pageTitle')}</title>
      </Head>
      <Content>
        <SidebarWrapper
          sx={{
            display: { xs: 'none', md: 'flex' }
          }}
        >
          <Scrollbar>
            <SidebarContent>
              <Logo />
              <Box mt={6}>
                <TypographyH1
                  variant="h1"
                  sx={{
                    mb: 7
                  }}
                >
                  {t('COVER.title')}
                </TypographyH1>
                <Box
                  sx={{
                    position: 'relative',
                    width: 300,
                    height: 120
                  }}
                >
                  <Tooltip arrow placement="top" title={t('COVER.circularEconomy')}>
                    <CardImg
                      sx={{
                        width: 80,
                        height: 80,
                        left: -20,
                        top: -40
                      }}
                    >
                      <Image width={40} height={40} alt={t('COVER.circularEconomy')} src={icons['CircularEconomy']} />
                    </CardImg>
                  </Tooltip>
                  <Tooltip arrow placement="top" title={t('COVER.innerTransition')}>
                    <CardImg
                      sx={{
                        width: 90,
                        height: 90,
                        left: 70
                      }}
                    >
                      <Image
                        width={50}
                        height={50}
                        alt={t('COVER.innerTransition')}
                        src={icons['InnerTransition']}
                      />
                    </CardImg>
                  </Tooltip>
                  <Tooltip arrow placement="top" title={t('COVER.transitionTowns')}>
                    <CardImg
                      sx={{
                        width: 110,
                        height: 110,
                        top: -30,
                        left: 170
                      }}
                    >
                      <Image width={80} height={80} alt={t('COVER.transitionTowns')} src={icons['TransitionTowns']} />
                    </CardImg>
                  </Tooltip>
                  <Tooltip arrow placement="top" title={t('COVER.innerCircle')}>
                    <CardImg
                      sx={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        right: -55
                      }}
                    >
                      <Image width={50} height={50} alt={t('COVER.innerCircle')} src={icons['InnerCircle']} />
                    </CardImg>
                  </Tooltip>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    my: 3
                  }}
                >
                  {t(
                    'COVER.description'
                  )}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {t('COVER.subtitle')}
                </Typography>
                <Typography variant="subtitle1">
                  {t(
                    'COVER.subtitleDescription'
                  )}
                  &nbsp;<Link href={process.env.NEXT_PUBLIC_HOME_URL + '/#about'}>{t('COVER.subtitleLink')}</Link>
                </Typography>
              </Box>
            </SidebarContent>
          </Scrollbar>
        </SidebarWrapper>
        <MainContent>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
            maxWidth="sm"
          >
            <Container maxWidth="sm"
              sx={{
                display: { xs: 'grid', md: 'none' },
                padding: { xs: '10px', md: 'none' },
                a: {
                  margin: { xs: '0 auto', md: '0' }
                }
              }}>
              <Logo />
              <Box sx={{width: "100%", padding: '10px', background: "white", borderRadius: '10px', boxShadow: '0px 9px 16px rgb(159 162 191 / 18%), 0px 2px 2px rgb(159 162 191 / 32%)'}}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    my: 1
                  }}
                >
                  {t(
                    'COVER.description'
                  )}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {t('COVER.subtitle')}
                </Typography>
                <Typography variant="subtitle1">
                  {t(
                    'COVER.subtitleDescription'
                  )}
                  &nbsp;<Link href={process.env.NEXT_PUBLIC_HOME_URL + '/#about'}>{t('COVER.subtitleLink')}</Link>
                </Typography>
              </Box>
            </Container>
            
            <Card
              sx={{
                p: 4,
                my: 4
              }}
            >
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('LABELS.title')}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3
                  }}
                >
                  {t('LABELS.subtitle')}
                </Typography>
              </Box>
              {method === 'Auth0' && <LoginAuth0 />}
              {method === 'FirebaseAuth' && <LoginFirebaseAuth />}
              {method === 'JWT' && <LoginJWT />}
              {method === 'Amplify' && <LoginAmplify />}
              <Box my={4}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {t('LABELS.noAccount')}
                </Typography>{' '}
                <Link
                  href={
                    demo
                      ? `/auth/register/wizard?demo=${demo}`
                      : '/auth/register/wizard'
                  }
                >
                  <b>{t('LABELS.registerHere')}</b>
                </Link>
              </Box>
              {method !== 'Auth0' && method !== 'JWT' && (
                <Tooltip
                  title={t('Used only for the live preview demonstration !')}
                >
                  <Alert severity="warning">
                    Use <b>demo@example.com</b> and password <b>TokyoPass1@</b>
                  </Alert>
                </Tooltip>
              )}
            </Card>
          </Container>
        </MainContent>
      </Content>
    </>
  );
}

LoginCover.getLayout = (page) => (
  <Guest>
    <BaseLayout>{page}</BaseLayout>
  </Guest>
);

export default LoginCover;
