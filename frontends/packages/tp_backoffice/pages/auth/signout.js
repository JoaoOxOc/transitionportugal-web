import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getCsrfToken } from "next-auth/react";
import { Card, Button, Container, Box, Grid, Typography, styled } from '@mui/material';
import Head from 'next/head';
import Logo from '../../components/Logo';
import { i18nextLogout } from "@transitionpt/translations";

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
      padding: '0 440px 0 0'
    },
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    minWidth: '500px'
    })
);

function Signout({ csrfToken })  {
    const { t } = i18nextLogout;
	const router = useRouter();

	function signOutHandler() {
		signOut({ redirect: false }).then(() => {
			router.back();
		});
	}

	return (
        <>
            <Head>
                <title>{t('LABELS.pageTitle')}</title>
            </Head>
            <Content>
                <MainContent>
                    <Container
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                        }}
                        maxWidth="sm"
                    >
                        <Card
                            sx={{
                                p: 4,
                                my: 4
                            }}
                        >
                            <Grid direction="row" container justifyContent="center">
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <h1 className="display-4 text-center mb-3">
                                        <Logo />
                                        {t('LABELS.title')}
                                    </h1>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Typography
                                        variant="h3"
                                        color="text.primary"
                                        fontWeight="bold"
                                        >
                                        {t('LABELS.subtitle')}
                                    </Typography>
                                    <br/>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <Button sx={{width: '150px'}} color="secondary" variant="contained" size="large" aria-describedby={t('LABELS.goBackButtonDescription')} onClick={() => router.back()}>{t('LABELS.goBackButton')}</Button>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    justifyContent="flex-end"
                                >
                                    <Button sx={{width: '150px'}} color="primary" type='submit' variant='contained' size="large" aria-describedby={t('LABELS.signOutDescription')} onClick={signOutHandler}>{t('LABELS.signOutButton')}</Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Container>
                </MainContent>
            </Content>
        </>
	)
}

export async function getServerSideProps({req}) {
    let csrfToken = await getCsrfToken({req});
    if (!csrfToken) {
      csrfToken = "";
    }
    return {
      props: { csrfToken },
    }
}

export default Signout;