import Head from 'next/head';

import ExtendedSidebarLayout from '../../../layouts/ExtendedSidebarLayout';
import { Authenticated } from '../../../components/Authenticated';

import DashboardExpensesContent from '../../../content/DashboardPages/expenses';

function DashboardExpenses() {
  return (
    <>
      <Head>
        <title>Expenses Dashboard</title>
      </Head>
      <DashboardExpensesContent />
    </>
  );
}

DashboardExpenses.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardExpenses;
