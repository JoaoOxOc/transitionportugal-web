import { useState, useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import Footer from '../../../../components/Footer';

import { i18nextUserDetails } from "@transitionpt/translations";
import UserDetails from '../../../../content/Management/Users/single/details';


function ManagementUsersView() {
    const router = useRouter();
    const { t } = i18nextUserDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextUserDetails.changeLanguage(currentLang);

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

      <UserDetails isProfile={false} userId={router.query.userId}/>
      <Footer />
    </>
  );
}


ManagementUsersView.getLayout = (page) => {
  const { props } = page;
  const pageChildren = props.children.length > 1 ? props.children[1] : props.children;
  return (
    <Authenticated session={pageChildren.props.session}>
      <Authorized session={pageChildren.props.session} scopes={["users.write"]}>
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

export default ManagementUsersView;
