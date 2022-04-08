import { useState, useEffect } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import UserCreate from '../../../../content/Management/Users/single/create';
import Footer from '../../../../components/Footer';

import { i18nextUserDetails } from "@transitionpt/translations";

function ManagementUserCreate() {
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
        <title>{t('LABELS.userCreate')}</title>
      </Head>

      <UserCreate/>

      <Footer />
    </>
    );
}

ManagementUserCreate.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["users.write"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementUserCreate;
