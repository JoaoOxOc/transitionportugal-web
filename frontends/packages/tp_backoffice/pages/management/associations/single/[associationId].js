import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import AssociationDetails from '../../../../content/Management/Associations/single/details';
import Footer from '../../../../components/Footer';

import { i18nextAssociationDetails } from "@transitionpt/translations";

function ManagementAssociationsView() {
    const { t } = i18nextAssociationDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextAssociationDetails.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
    <>
      <Head>
        <title>{t('LABELS.associationDetails')}</title>
      </Head>

      <AssociationDetails/>

      <Footer />
    </>
    );
}


ManagementAssociationsView.getLayout = (page) => {
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

export default ManagementAssociationsView;
