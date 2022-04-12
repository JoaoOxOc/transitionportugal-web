import Head from 'next/head';

import { Authenticated } from '../../../components/Authenticated';
import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';

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
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default DashboardAnalytics;
