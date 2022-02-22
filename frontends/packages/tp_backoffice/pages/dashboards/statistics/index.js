import Head from 'next/head';

import ExtendedSidebarLayout from '../../../layouts/ExtendedSidebarLayout';
import { Authenticated } from '../../../components/Authenticated';

import DashboardStatisticsContent from '../../../content/DashboardPages/statistics';

function DashboardStatistics() {
  return (
    <>
      <Head>
        <title>Statistics Dashboard</title>
      </Head>
      <DashboardStatisticsContent />
    </>
  );
}

DashboardStatistics.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardStatistics;
