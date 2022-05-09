import { useState, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../components/Authenticated';
import { Authorized } from '../../../components/Authorized';

import PageHeader from '../../../content/Management/Associations/PageHeader';
import Footer from '../../../components/Footer';

import { Grid } from '@mui/material';

import PageTitleWrapper from '../../../components/PageTitleWrapper';

import Results from '../../../content/Management/Associations/Results';

import { i18nextAssociationsList } from "@transitionpt/translations";

import { AssociationsSearchProvider } from '../../../contexts/Search/AssociationsSearchContext';
import { AssociationsActionsProvider } from '../../../contexts/Actions/AssociationsActionsContext';

function ManagementAssociations() {
    const { t } = i18nextAssociationsList;
  const [currentLang, setLang] = useState("pt");
  i18nextAssociationsList.changeLanguage(currentLang);

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  return (
    <>
      <Head>
        <title>{t('LABELS.associationsManagement')}</title>
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
          <AssociationsSearchProvider>
            <AssociationsActionsProvider>
              <Results />
            </AssociationsActionsProvider>
          </AssociationsSearchProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementAssociations.getLayout = (page) => {
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

  // redirect the user if there is no session   
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // passing the session object to the page  
  return { props: {session: session} };
};

export default ManagementAssociations;