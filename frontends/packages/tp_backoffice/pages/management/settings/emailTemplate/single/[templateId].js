import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../../components/Authenticated';
import { Authorized } from '../../../../../components/Authorized';

import EmailTemplateDetails from '../../../../../content/Management/EmailTemplates/single/details';
import Footer from '../../../../../components/Footer';

import { i18nextEmailTemplateDetails } from "@transitionpt/translations";

function ManagementEmailTemplatesView() {
    const { t } = i18nextEmailTemplateDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextEmailTemplateDetails.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
    <>
      <Head>
        <title>{t('LABELS.emailTemplateDetails')}</title>
      </Head>

      <EmailTemplateDetails isCreate={false} isEditor={false}/>

      <Footer />
    </>
    );
}


ManagementEmailTemplatesView.getLayout = (page) => {
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

export default ManagementEmailTemplatesView;
