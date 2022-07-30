import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {
    Box,
    Typography,
    Container,
    Divider,
    OutlinedInput,
    IconButton,
    Tooltip,
    FormControl,
    InputAdornment,
    Button,
    styled,
    FormHelperText
  } from '@material-ui/core';
import { i18nextAbout } from "@transitionpt/translations";
import Logo from '../components/logo';
import LogoDark from '../public/logotipo_transicaoportugal.svg';

const MainContent = styled(Box)(
    () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  `
  );
  
  const TopWrapper = styled(Box)(
    ({ theme }) => `
    margin-top: 30vh;
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing(6)};
  `
  );
  
  const TypographyH1 = styled(Typography)(
    ({ theme }) => `
    font-size: ${theme.typography.pxToRem(75)};
  `
  );
  
  const TypographyH3 = styled(Typography)(
    ({ theme }) => `
    color: ${theme.colors.alpha.black[50]};
  `
  );
  
  const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
  );
  
  const ButtonNotify = styled(Button)(
    ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
  );

export default function UnderConstructionSection() {
    const [currentLang, setLang] = useState("pt");
    const { t } = i18nextAbout;
    i18nextAbout.changeLanguage(currentLang);

    const calculateTimeLeft = () => {
        const difference = +new Date(`2022`) - +new Date();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }
    
        return timeLeft;
    };
    
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    }, []);

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
        return;
        }

        timerComponents.push(
        <Box textAlign="center" px={3}>
            <TypographyH1 variant="h1">{timeLeft[interval]}</TypographyH1>
            <TypographyH3 variant="h3">{interval}</TypographyH3>
        </Box>
        );
    });

    return (
        <>
        <Head>
            <title>Status - Coming Soon</title>
        </Head>
        <MainContent>
            <TopWrapper>
            <Container style={{paddingTop: '25vh'}} maxWidth="lg">
                <Box textAlign="center" mb={3}>
                <Container maxWidth="xs">
                    <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
                    {t('Em construção')}
                    </Typography>
                    <Divider style={{ marginBottom: '40px' }} />
                    <Typography
                    variant="h4"
                    color="text.secondary"
                    fontWeight="normal"
                    sx={{ mb: 4 }}
                    >
                    {t(
                        "Somos uma equipa de voluntários. Trabalhamos diariamente em espírito ou fisicamente para continuar a inovar esta plataforma e este movimento. Se deseja ajudar por favor entre em contacto connosco"
                    )}
                    </Typography>
                </Container>
                {/* <img
                    alt="Coming Soon"
                    height={200}
                    src="/admin/static/images/status/coming-soon.svg"
                /> */}
                </Box>

                {/* <Box display="flex" justifyContent="center">
                {timerComponents.length ? timerComponents : <>Time&apos;s up!</>}
                </Box> */}

                {/* <Container maxWidth="sm">
                <Box sx={{ textAlign: 'center', p: 4 }}> */}
                    {/* <FormControl variant="outlined" fullWidth>
                    <OutlinedInputWrapper
                        type="text"
                        placeholder={t('Enter your email address here...')}
                        endAdornment={
                        <InputAdornment position="end">
                            <ButtonNotify variant="contained" size="small">
                            {t('Notify Me')}
                            </ButtonNotify>
                        </InputAdornment>
                        }
                        startAdornment={
                        <InputAdornment position="start">
                            <MailTwoToneIcon />
                        </InputAdornment>
                        }
                    />
                    <FormHelperText>
                        {t("We'll email you once our website is launched!")}
                    </FormHelperText>
                    </FormControl> */}
                    {/* <Divider sx={{ my: 4 }} /> */}
                    {/* <Box sx={{ textAlign: 'center' }}>
                    <Tooltip arrow placement="top" title="Facebook">
                        <IconButton color="primary">
                        <FacebookIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="top" title="Twitter">
                        <IconButton color="primary">
                        <TwitterIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="top" title="Instagram">
                        <IconButton color="primary">
                        <InstagramIcon />
                        </IconButton>
                    </Tooltip>
                    </Box> */}
                {/* </Box>
                </Container> */}
            </Container>
            </TopWrapper>
        </MainContent>
        </>
    );
}