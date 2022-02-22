import Head from 'next/head';

import ExtendedSidebarLayout from '../../../layouts/ExtendedSidebarLayout';
import { Authenticated } from '../../../components/Authenticated';

import DashboardLearningContent from '../../../content/DashboardPages/learning';

function DashboardLearning() {
  return (
    <>
      <Head>
        <title>Learning Dashboard</title>
      </Head>
      <DashboardLearningContent />
    </>
  );
}

DashboardLearning.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardLearning;
