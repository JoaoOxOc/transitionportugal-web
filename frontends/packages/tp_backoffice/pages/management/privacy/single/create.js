import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import TermsDetails from '../../../../content/Management/Terms/single/details';
import Footer from '../../../../components/Footer';

import { i18nextTermsDetails } from "@transitionpt/translations";

function ManagementTermsCreate() {
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
        <title>{t('LABELS.termsCreate')}</title>
      </Head>

      <TermsDetails isCreate={true}/>

      <Footer />
    </>
    );
}

ManagementTermsCreate.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["terms.admin"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementTermsCreate;
