import Head from 'next/head';

import { Authenticated } from '../../../components/Authenticated';
import ExtendedSidebarLayout from '../../../layouts/ExtendedSidebarLayout';

import DashboardCommerceContent from '../../../content/DashboardPages/commerce';

function DashboardCommerce() {
  return (
    <>
      <Head>
        <title>Commerce Dashboard</title>
      </Head>
      <DashboardCommerceContent />
    </>
  );
}

DashboardCommerce.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardCommerce;
