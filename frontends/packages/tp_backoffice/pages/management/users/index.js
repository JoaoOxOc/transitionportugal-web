import { useState, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../components/Authenticated';
import { Authorized } from '../../../components/Authorized';

import PageHeader from '../../../content/Management/Users/PageHeader';
import Footer from '../../../components/Footer';

import { Grid } from '@mui/material';

import PageTitleWrapper from '../../../components/PageTitleWrapper';

import Results from '../../../content/Management/Users/Results';

import { i18nextUsersList } from "@transitionpt/translations";

import { UsersSearchProvider } from '../../../contexts/Search/UsersSearchContext';

function ManagementUsers() {
  const { t } = i18nextUsersList;
  const [currentLang, setLang] = useState("pt");
  i18nextUsersList.changeLanguage(currentLang);

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  return (
    <>
      <Head>
        <title>{t('LABELS.UsersManagement')}</title>
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
          <UsersSearchProvider>
            <Results />
          </UsersSearchProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}


ManagementUsers.getLayout = (page) => {
  const { props } = page;
  return (
    <Authenticated session={props.children.props.session}>
      <Authorized session={props.children.props.session} scopes={["users.write"]}>
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

export default ManagementUsers;
