import Head from 'next/head';

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
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
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default DashboardHelpdesk;
