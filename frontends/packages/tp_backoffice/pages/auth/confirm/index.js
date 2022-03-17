import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Container,
  Button,
  Avatar,
  styled
} from '@mui/material';
import Head from 'next/head';

import BaseLayout from '../../../layouts/BaseLayout';
import { useRouter } from 'next/router';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { Guest } from '../../../components/Guest';
import Link from '../../../components/Link';
import { i18nextConfirmEmail } from "@transitionpt/translations";
import Logo from '../../../components/LogoSign';
import {genericFetch} from '../../../services/genericFetch';

const MainContent = styled(Box)(
    () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
  );
  
  const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
        box-shadow: ${theme.colors.shadows.success};
        margin-left: auto;
        margin-right: auto;
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
  );

  const AvatarError = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.error.main};
        color: ${theme.palette.error.contrastText};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
        box-shadow: ${theme.colors.shadows.error};
        margin-left: auto;
        margin-right: auto;
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
  );

function ConfirmEmail() {
    const [currentLang, setLang] = useState("pt");
    i18nextConfirmEmail.changeLanguage(currentLang);
    const router = useRouter();
    const { t } = router.query;

    const [emailVerified, setEmailVerified] = useState(null);

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);

        const verifyEmail = async (token) => {
            const emailVerified = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/confirmemail", "GET", token,{});
            if (emailVerified.status == 401) {
                setEmailVerified(false);
            }
            else if (emailVerified.message == "email_verified") {
                setEmailVerified(true);
            }
        };
        if (t) {
            verifyEmail(t);
        }
      }, [t]);
  
    return (
      <>
        <Head>
          <title>{i18nextConfirmEmail.t('LABELS.pageTitle')}</title>
        </Head>
        <MainContent>
        <Container maxWidth="md">
          <Logo />
          <Card
            sx={{
              mt: 3,
              p: 4
            }}
          >
            { emailVerified == true &&
            <Box px={4} py={8}>
                <Container maxWidth="md">
                    <AvatarSuccess>
                        <CheckTwoToneIcon />
                    </AvatarSuccess>

                    <Typography
                        align="center"
                        sx={{
                        py: 4,
                        px: 10
                        }}
                        variant="h3"
                    >
                        {i18nextConfirmEmail.t('LABELS.successMessage')}
                    </Typography>

                    <Button
                        fullWidth
                        component={Link}
                        size="large"
                        variant="contained"
                        aria-label={ i18nextConfirmEmail.t('LABELS.buttonToLogin') }
                        href={'/auth/login/cover'}
                    >
                        {i18nextConfirmEmail.t('LABELS.goLogIn')}
                    </Button>
                </Container>
            </Box>
            }
            { emailVerified == false &&
            <Box px={4} py={8}>
                <Container maxWidth="md">
                    <AvatarError>
                        <ErrorTwoToneIcon />
                    </AvatarError>

                    <Typography
                        align="center"
                        sx={{
                        py: 4,
                        px: 10
                        }}
                        variant="h3"
                    >
                        {i18nextConfirmEmail.t('LABELS.expiredToken')}
                    </Typography>

                    <Button
                        fullWidth
                        component={Link}
                        size="large"
                        variant="contained"
                        aria-label={ i18nextConfirmEmail.t('LABELS.buttonToLogin') }
                        href={'/auth/login/cover'}
                    >
                        {i18nextConfirmEmail.t('LABELS.goLogIn')}
                    </Button>
                </Container>
            </Box>
            }
          </Card>
        </Container>
      </MainContent>
      </>
    )
}

ConfirmEmail.getLayout = (page) => (
    <Guest>
      <BaseLayout>{page}</BaseLayout>
    </Guest>
  );
  
  export default ConfirmEmail;