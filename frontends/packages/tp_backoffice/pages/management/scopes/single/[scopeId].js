import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import ScopeDetails from '../../../../content/Management/Scopes/single/details';
import Footer from '../../../../components/Footer';

import { i18nextScopeDetails } from "@transitionpt/translations";

function ManagementScopesView() {
    const { t } = i18nextScopeDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextScopeDetails.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
    <>
      <Head>
        <title>{t('LABELS.scopeDetails')}</title>
      </Head>

      <ScopeDetails/>

      <Footer />
    </>
    );
}


ManagementScopesView.getLayout = (page) => {
  const { props } = page;
  return (
    <Authenticated session={props.children.props.session}>
      <Authorized session={props.children.props.session} scopes={["scopes.admin"]}>
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

export default ManagementScopesView;
