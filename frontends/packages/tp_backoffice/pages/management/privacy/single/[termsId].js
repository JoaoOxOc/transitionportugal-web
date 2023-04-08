import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import TermsDetails from '../../../../content/Management/Terms/single/details';
import Footer from '../../../../components/Footer';

import { i18nextTermsDetails } from "@transitionpt/translations";

function ManagementTermsEdit() {
    const { t } = i18nextTermsDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextTermsDetails.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
    <>
      <Head>
        <title>{t('LABELS.termsDetails')}</title>
      </Head>

      <TermsDetails/>

      <Footer />
    </>
    );
}


ManagementTermsEdit.getLayout = (page) => {
  const { props } = page;
  const pageChildren = props.children.length > 1 ? props.children[1] : props.children;
  return (
    <Authenticated session={pageChildren.props.session}>
      <Authorized session={pageChildren.props.session} scopes={["terms.admin"]}>
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

export default ManagementTermsEdit;
