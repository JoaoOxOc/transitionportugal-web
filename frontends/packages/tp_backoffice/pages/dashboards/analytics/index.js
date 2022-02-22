import Head from 'next/head';

import { Authenticated } from '../../../components/Authenticated';
import ExtendedSidebarLayout from '../../../layouts/ExtendedSidebarLayout';

import DashboardAnalyticsContent from '../../../content/DashboardPages/analytics';

function DashboardAnalytics() {
  return (
    <>
      <Head>
        <title>Analytics Dashboard</title>
      </Head>
      <DashboardAnalyticsContent />
    </>
  );
}

DashboardAnalytics.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardAnalytics;
