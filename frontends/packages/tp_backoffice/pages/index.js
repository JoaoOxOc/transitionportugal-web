import Head from 'next/head';

import AccentHeaderLayout from '../layouts/AccentHeaderLayout';
import { Authenticated } from '../components/Authenticated';

import DashboardReportsContent from '../content/DashboardPages/reports';

function DashboardReports({api_url}) {
  console.log("env API URL: ",api_url)
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



export async function getStaticProps() {
  const backData = {
    props: {
      api_url: process.env.NEXT_PUBLIC_API_BASE_URL ? process.env.NEXT_PUBLIC_API_BASE_URL : ""
    }
  };
  return backData;
}

export default DashboardReports;
