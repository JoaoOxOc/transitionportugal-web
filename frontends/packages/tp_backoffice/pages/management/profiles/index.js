import { useState, useEffect } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../components/Authenticated';
import { Authorized } from '../../../components/Authorized';

import PageHeader from '../../../content/Management/Roles/PageHeader';
import Footer from '../../../components/Footer';

import { Grid } from '@mui/material';

import PageTitleWrapper from '../../../components/PageTitleWrapper';

import Results from '../../../content/Management/Roles/Results';

import { i18nextRolesList } from "@transitionpt/translations";

import { RolesSearchProvider } from '../../../contexts/Search/RolesSearchContext';

function ManagementRoles() {
    const { t } = i18nextRolesList;
  const [currentLang, setLang] = useState("pt");
  i18nextRolesList.changeLanguage(currentLang);

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  return (
    <>
      <Head>
        <title>{t('LABELS.RolesManagement')}</title>
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
          <RolesSearchProvider>
            <Results />
          </RolesSearchProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementRoles.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["users.write"]}>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementRoles;