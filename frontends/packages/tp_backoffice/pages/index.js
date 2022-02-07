import Head from 'next/head';

import AccentHeaderLayout from '../layouts/AccentHeaderLayout';
import { Authenticated } from '../components/Authenticated';

import DashboardReportsContent from '../content/DashboardPages/reports';

function DashboardReports() {
  return (
    <>
      <Head>
        <title>Reports Dashboard</title>
      </Head>
      <DashboardReportsContent />
    </>
  );
}

DashboardReports.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default DashboardReports;
