import Head from 'next/head';

import ExtendedSidebarLayout from '../../../layouts/ExtendedSidebarLayout';
import { Authenticated } from '../../../components/Authenticated';

import DashboardTasksContent from '../../../content/DashboardPages/tasks';

function DashboardTasks() {
  return (
    <>
      <Head>
        <title>Tasks Dashboard</title>
      </Head>
      <DashboardTasksContent />
    </>
  );
}

DashboardTasks.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardTasks;