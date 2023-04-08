import { useState, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import PageHeader from '../../../../content/Management/Settings/PageHeader';
import Footer from '../../../../components/Footer';

import { i18nextSettingsList } from "@transitionpt/translations";

import { Grid } from '@mui/material';

import PageTitleWrapper from '../../../../components/PageTitleWrapper';

import { SettingsSearchProvider } from '../../../../contexts/Search/SettingsSearchContext';

import Results from '../../../../content/Management/Settings/Results';

function SettingsPage() {
  const { t } = i18nextSettingsList;
  const [currentLang, setLang] = useState("pt");
  i18nextSettingsList.changeLanguage(currentLang);

  

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  return (
    <>
      <Head>
        <title>{t('LABELS.emailSettings')}</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader settingsType={"email"}/>
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
          <SettingsSearchProvider>
              <Results settingsType={"email"} />
          </SettingsSearchProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}


SettingsPage.getLayout = (page) => {
  const { props } = page;
  const pageChildren = props.children.length > 1 ? props.children[1] : props.children;
  return (
    <Authenticated session={pageChildren.props.session}>
      <Authorized session={pageChildren.props.session} scopes={["settings.admin"]}>
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

export default SettingsPage;
