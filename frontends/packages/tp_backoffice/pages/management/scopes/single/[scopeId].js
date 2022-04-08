import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';

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

ManagementScopesView.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["users.write"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementScopesView;