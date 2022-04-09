import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import RoleDetails from '../../../../content/Management/Roles/single/details';
import Footer from '../../../../components/Footer';

import { i18nextRoleDetails } from "@transitionpt/translations";

function ManagementRolesView() {
    const { t } = i18nextRoleDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextRoleDetails.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
    <>
      <Head>
        <title>{t('LABELS.roleDetails')}</title>
      </Head>

      <RoleDetails/>

      <Footer />
    </>
    );
}

ManagementRolesView.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["users.write"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementRolesView;
