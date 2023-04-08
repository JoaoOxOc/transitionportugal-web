import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";
import { PureLightTheme } from '../../theme/schemes/PureLightTheme';

import { useRefMounted } from '../../hooks/useRefMounted';
import AccentHeaderLayout from '../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../components/Authenticated';
import { Authorized } from '../../components/Authorized';
import { GetAssociationData } from '../../services/associations';
import { getUserIdAndAssociation } from '../../utils/jwt';

import Footer from '../../components/Footer';

import { i18nextAssociationDetails } from "@transitionpt/translations";
// import ProfileCover from '../../content/Management/Associations/single/ProfileCover';
import {ProfileCover} from "@transitionpt/components";


function AssociationProfileView(props) {
  console.log(props);
    const { t } = i18nextAssociationDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextAssociationDetails.changeLanguage(currentLang);

    // const userData = getUserIdAndAssociation(window.localStorage.getItem('accessToken'));
    // console.log(userData);

    // consultar: https://tokyo-black-nextjs-js.bloomui.com/management/users/single/1

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

      {/* <ProfileCover association={props.associationData}/> */}
      <ProfileCover association={props.associationData}/>
      {/* <AssociationDetails isCreate={false} isProfile={true} associationId={userData.associationId}/> */}
      <Footer />
    </>
  );
}


AssociationProfileView.getLayout = (page) => {
  const { props } = page;
  const pageChildren = props.children.length > 1 ? props.children[1] : props.children;
  return (
    <Authenticated session={pageChildren.props.session}>
      <Authorized session={pageChildren.props.session} scopes={["association.read","association.admin"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
      </Authorized>
    </Authenticated>
  );
}

export const getServerSideProps = async (context) => {
    let associationUri = "/association/profile";
    // get the session
    const session = await getSession(context);
    let associationGetResponse = null;
    let associationGetResponseError = null;
    try {
      associationGetResponse = await GetAssociationData(process.env.NEXT_PUBLIC_API_BASE_URL + associationUri, session.accessToken);
      console.log(associationGetResponse)
      
      if (associationGetResponse.status) {
        associationGetResponseError = {status: associationGetResponse.status, statusText: associationGetResponse.statusText };
      }
    } catch (err) {
      associationGetResponseError = {status: err.status, statusText: err.statusText };
    }

    const associationData = associationGetResponseError ? { session: session, associationProfileError: associationGetResponseError } : {session: session, associationData: associationGetResponse.associationData};

    // passing the session object to the page  
    return { props: associationData };
};

export default AssociationProfileView;
