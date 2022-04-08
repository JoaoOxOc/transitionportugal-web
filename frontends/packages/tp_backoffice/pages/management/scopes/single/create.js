import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import ClientAppDetails from '../../../../content/Management/App/Clients/single/details';
import Footer from '../../../../components/Footer';

import { i18nextClientDetails } from "@transitionpt/translations";

function ManagementAssociationsCreate() {
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

ManagementAssociationsCreate.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["users.write"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementAssociationsCreate;
