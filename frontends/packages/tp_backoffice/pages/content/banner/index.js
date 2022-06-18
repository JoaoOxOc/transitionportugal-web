import { useState, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../components/Authenticated';
import { Authorized } from '../../../components/Authorized';

import PageHeader from '../../../content/CMS/Banners/PageHeader';
import Footer from '../../../components/Footer';

import { Grid } from '@mui/material';

import PageTitleWrapper from '../../../components/PageTitleWrapper';

import Results from '../../../content/CMS/Banners/Results';

import { i18nextBannersList } from "@transitionpt/translations";

import { BannersSearchProvider } from '../../../contexts/Search/CMS//BannersSearchContext';

function CmsBanners() {
    const { t } = i18nextBannersList;
  const [currentLang, setLang] = useState("pt");
  i18nextBannersList.changeLanguage(currentLang);

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  return (
    <>
      <Head>
        <title>{t('LABELS.bannersManagement')}</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <BannersSearchProvider>
            <Results />
          </BannersSearchProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}


CmsBanners.getLayout = (page) => {
  const { props } = page;
  return (
    <Authenticated session={props.children.props.session}>
      <Authorized session={props.children.props.session} scopes={["cms.read","cms.write"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
      </Authorized>
    </Authenticated>
  );
}

export const getServerSideProps = async (context) => {
  // get the session
  const session = await getSession(context);

  // passing the session object to the page  
  return { props: {session: session} };
};

export default CmsBanners;