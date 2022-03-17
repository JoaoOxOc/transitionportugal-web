import Head from 'next/head';

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
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
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default DashboardTasks;
