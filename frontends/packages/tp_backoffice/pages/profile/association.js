import { useState, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../components/Authenticated';
import { Authorized } from '../../components/Authorized';
import { getUserIdAndAssociation } from '../../utils/jwt';

import Footer from '../../components/Footer';

import { i18nextAssociationDetails } from "@transitionpt/translations";
import ProfileCover from '../../content/Profile/Association/ProfileCover';
import AssociationDetails from '../../content/Management/Associations/single/details';


function AssociationProfileView() {
    const { t } = i18nextAssociationDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextAssociationDetails.changeLanguage(currentLang);

    const userData = getUserIdAndAssociation(window.localStorage.getItem('accessToken'));
    console.log(userData);

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

      {/* <AssociationDetails isCreate={false} isProfile={true} associationId={userData.associationId}/> */}
      <Footer />
    </>
  );
}


AssociationProfileView.getLayout = (page) => {
  const { props } = page;
  return (
    <Authenticated session={props.children.props.session}>
      <Authorized session={props.children.props.session} scopes={["users.write","association.admin"]}>
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

export default AssociationProfileView;
