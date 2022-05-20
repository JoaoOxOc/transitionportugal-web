import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../../components/Authenticated';
import { Authorized } from '../../../../../components/Authorized';

import ClientAppDetails from '../../../../../content/Management/App/Clients/single/details';
import Footer from '../../../../../components/Footer';

import { i18nextClientDetails } from "@transitionpt/translations";

function ManagementClientAppsCreate() {
    const { t } = i18nextClientDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextClientDetails.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
    <>
      <Head>
        <title>{t('LABELS.clientDetails')}</title>
      </Head>

      <ClientAppDetails isCreate={true}/>

      <Footer />
    </>
    );
}


ManagementClientAppsCreate.getLayout = (page) => {
  const { props } = page;
  return (
    <Authenticated session={props.children.props.session}>
      <Authorized session={props.children.props.session} scopes={["client.admin"]}>
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

export default ManagementClientAppsCreate;
