import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import ClientAppDetails from '../../../../content/Management/App/Clients/single/details';
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
        <title>{t('LABELS.clientDetails')}</title>
      </Head>

      <ClientAppDetails/>

      <Footer />
    </>
    );
}

ManagementAssociationsView.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["users.write"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementAssociationsView;
