import Head from 'next/head';

import ExtendedSidebarLayout from '../../../layouts/ExtendedSidebarLayout';
import { Authenticated } from '../../../components/Authenticated';

import DashboardHelpdeskContent from '../../../content/DashboardPages/helpdesk';

function DashboardHelpdesk() {
  return (
    <>
      <Head>
        <title>Helpdesk Dashboard</title>
      </Head>
      <DashboardHelpdeskContent />
    </>
  );
}

DashboardHelpdesk.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardHelpdesk;
