import { useState, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../components/Authenticated';
import { Authorized } from '../../components/Authorized';
import { getUserIdAndAssociation } from '../../utils/jwt';

import Footer from '../../components/Footer';

import { i18nextUserDetails } from "@transitionpt/translations";
import UserDetails from '../../content/Management/Users/single/details';


function UserProfileView() {
    const { t } = i18nextUserDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextUserDetails.changeLanguage(currentLang);

    const userData = getUserIdAndAssociation(window.localStorage.getItem('accessToken'));

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
    <>
      <Head>
        <title>{t('LABELS.userDetails')}</title>
      </Head>

      <UserDetails isProfile={true} userId={userData.userId}/>
      <Footer />
    </>
  );
}


UserProfileView.getLayout = (page) => {
  const { props } = page;
  return (
    <Authenticated session={props.children.props.session}>
      <Authorized session={props.children.props.session} scopes={["user.write"]}>
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

export default UserProfileView;
