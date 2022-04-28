import { useState, useEffect } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../components/Authenticated';
import { Authorized } from '../../components/Authorized';
import { getUserIdAndAssociation } from '../../utils/jwt';

import Footer from '../../components/Footer';

import { i18nextAssociationDetails } from "@transitionpt/translations";
import AssociationDetails from '../../content/Management/Associations/single/details';


function AssociationProfileView() {
    const { t } = i18nextAssociationDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextAssociationDetails.changeLanguage(currentLang);

    const userData = getUserIdAndAssociation(window.sessionStorage.getItem('accessToken'));
    console.log(userData);

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

      <AssociationDetails isCreate={false} isProfile={true} associationId={userData.associationId}/>
      <Footer />
    </>
  );
}

AssociationProfileView.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["association.admin"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default AssociationProfileView;
