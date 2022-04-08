import { useState, useEffect } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../components/Authenticated';
import { Authorized } from '../../../components/Authorized';

import PageHeader from '../../../content/Management/Scopes/PageHeader';
import Footer from '../../../components/Footer';

import { Grid } from '@mui/material';

import PageTitleWrapper from '../../../components/PageTitleWrapper';

import Results from '../../../content/Management/Scopes/Results';

import { i18nextScopesList } from "@transitionpt/translations";

import { ScopesSearchProvider } from '../../../contexts/Search/ScopesSearchContext';

function ManagementScopes() {
    const { t } = i18nextScopesList;
  const [currentLang, setLang] = useState("pt");
  i18nextScopesList.changeLanguage(currentLang);

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  return (
    <>
      <Head>
        <title>{t('LABELS.ScopesManagement')}</title>
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
          <ScopesSearchProvider>
            <Results />
          </ScopesSearchProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementScopes.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["users.write"]}>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementScopes;