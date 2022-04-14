import { useState, useEffect } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../components/Authenticated';
import { Authorized } from '../../../components/Authorized';

import PageHeader from '../../../content/Management/Terms/PageHeader';
import Footer from '../../../components/Footer';

import { Grid } from '@mui/material';

import PageTitleWrapper from '../../../components/PageTitleWrapper';

import Results from '../../../content/Management/Terms/Results';

import { i18nextTermsList } from "@transitionpt/translations";

import { TermsSearchProvider } from '../../../contexts/Search/TermsSearchContext';

function ManagementPrivacy() {
    const { t } = i18nextTermsList;
  const [currentLang, setLang] = useState("pt");
  i18nextTermsList.changeLanguage(currentLang);

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  return (
    <>
      <Head>
        <title>{t('LABELS.termsManagement')}</title>
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
          <TermsSearchProvider>
            <Results />
          </TermsSearchProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementPrivacy.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["terms.admin"]}>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementPrivacy;