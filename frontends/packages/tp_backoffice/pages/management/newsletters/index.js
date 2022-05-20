///newsletter/get/lists

import { useState, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../components/Authenticated';
import { Authorized } from '../../../components/Authorized';

import PageHeader from '../../../content/Management/Newsletters/PageHeader';
import Footer from '../../../components/Footer';

import { Grid } from '@mui/material';

import PageTitleWrapper from '../../../components/PageTitleWrapper';

import Results from '../../../content/Management/Newsletters/Results';

import { i18nextNewsletterSubscriptionsList } from "@transitionpt/translations";

import { NewslettersSearchProvider } from '../../../contexts/Search/NewslettersSearchContext';

function ManagementNewsletterSubscriptions() {
    const { t } = i18nextNewsletterSubscriptionsList;
  const [currentLang, setLang] = useState("pt");
  i18nextNewsletterSubscriptionsList.changeLanguage(currentLang);

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  return (
    <>
      <Head>
        <title>{t('LABELS.newsletterSubscriptionsManagement')}</title>
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
          <NewslettersSearchProvider>
            <Results />
          </NewslettersSearchProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}


ManagementNewsletterSubscriptions.getLayout = (page) => {
  const { props } = page;
  return (
    <Authenticated session={props.children.props.session}>
      <Authorized session={props.children.props.session} scopes={["newsletter.admin"]}>
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

export default ManagementNewsletterSubscriptions;