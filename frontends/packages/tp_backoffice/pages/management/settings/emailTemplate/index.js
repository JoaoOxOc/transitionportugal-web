import { useState, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import PageHeader from '../../../../content/Management/EmailTemplates/PageHeader';
import Footer from '../../../../components/Footer';

import { i18nextEmailTemplatesList } from "@transitionpt/translations";

import { Grid } from '@mui/material';

import PageTitleWrapper from '../../../../components/PageTitleWrapper';

import { EmailTemplatesSearchProvider } from '../../../../contexts/Search/EmailTemplatesSearchContext';

import Results from '../../../../content/Management/EmailTemplates/Results';

function EmailTemplatesPage() {
  const { t } = i18nextEmailTemplatesList;
  const [currentLang, setLang] = useState("pt");
  i18nextEmailTemplatesList.changeLanguage(currentLang);

  

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  return (
    <>
      <Head>
        <title>{t('LABELS.emailTemplatesManagement')}</title>
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
          <EmailTemplatesSearchProvider>
              <Results />
          </EmailTemplatesSearchProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}


EmailTemplatesPage.getLayout = (page) => {
  const { props } = page;
  return (
    <Authenticated session={props.children.props.session}>
      <Authorized session={props.children.props.session} scopes={["email.admin"]}>
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

export default EmailTemplatesPage;
