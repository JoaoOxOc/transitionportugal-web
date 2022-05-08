import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../layouts/AccentHeaderLayout';
import { Authenticated } from '../components/Authenticated';

import DashboardReportsContent from '../content/DashboardPages/reports';

// https://stackoverflow.com/questions/70717224/how-to-define-a-custom-base-path-when-nextauth-url-doesnt-work
// https://next-auth.js.org/tutorials/refresh-token-rotation
function DashboardReports({api_url, session}) {
  console.log("env API URL: ",api_url, session)
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


export const getServerSideProps = async (context) => {
  // get the session
  const session = await getSession(context);

  // redirect the user if there is no session   
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  // passing the session object to the page  
  return { props: {session: session} };
}; 


// export async function getStaticProps() {
//   const backData = {
//     props: {
//       api_url: process.env.NEXT_PUBLIC_API_BASE_URL ? process.env.NEXT_PUBLIC_API_BASE_URL : ""
//     }
//   };
//   return backData;
// }

export default DashboardReports;
