import { Box, Card, Container, Button, styled } from '@mui/material';

import BaseLayout from '../layouts/BaseLayout';

import Link from '../components/Link';
import Head from 'next/head';
import { i18nextAbout } from "@transitionpt/translations";
import Logo from '../components/LogoSign';
import Hero from '../content/Overview/Hero';
import Highlights from '../content/Overview/Highlights';
import LanguageSwitcher from '../layouts/BoxedSidebarLayout/Header/Buttons/LanguageSwitcher';
import Footer from '../components/Footer';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const { t } = i18nextAbout;

  return (
    <OverviewWrapper>
      <Head>
        <title>Tokyo White NextJS Javascript Admin Dashboard</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <LanguageSwitcher />
                <Button
                  component={Link}
                  href="/dashboards/reports"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  {t('Live Preview')}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
      <Highlights />
      <Footer />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
