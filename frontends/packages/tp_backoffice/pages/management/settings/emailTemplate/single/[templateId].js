import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../../components/Authenticated';
import { Authorized } from '../../../../../components/Authorized';

import SettingDetails from '../../../../../content/Management/Settings/single/details';
import Footer from '../../../../../components/Footer';

import { i18nextSettingDetails } from "@transitionpt/translations";

function ManagementEmailTemplatesView() {
    const { t } = i18nextSettingDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextSettingDetails.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
    <>
      <Head>
        <title>{t('LABELS.settingDetails')}</title>
      </Head>

      <SettingDetails/>

      <Footer />
    </>
    );
}

ManagementEmailTemplatesView.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["email.admin"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementEmailTemplatesView;
