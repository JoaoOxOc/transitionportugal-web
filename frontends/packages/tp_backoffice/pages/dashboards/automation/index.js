import Head from 'next/head';

import { Authenticated } from '../../../components/Authenticated';
import ExtendedSidebarLayout from '../../../layouts/ExtendedSidebarLayout';

import DashboardAutomationContent from '../../../content/DashboardPages/automation';

function DashboardAutomation() {
  return (
    <>
      <Head>
        <title>Automation Dashboard</title>
      </Head>
      <DashboardAutomationContent />
    </>
  );
}

DashboardAutomation.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardAutomation;
