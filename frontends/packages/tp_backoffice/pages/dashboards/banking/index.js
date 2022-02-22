import Head from 'next/head';

import { Authenticated } from '../../../components/Authenticated';
import ExtendedSidebarLayout from '../../../layouts/ExtendedSidebarLayout';

import DashboardBankingContent from '../../../content/DashboardPages/banking';

function DashboardBanking() {
  return (
    <>
      <Head>
        <title>Banking Dashboard</title>
      </Head>
      <DashboardBankingContent />
    </>
  );
}

DashboardBanking.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardBanking;
