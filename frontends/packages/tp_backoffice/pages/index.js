import {useState} from 'react';
import Head from 'next/head';
import {getSession} from "next-auth/react";
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../pages/api/auth/[...nextauth]';
import { useSession } from "next-auth/react";

import AccentHeaderLayout from '../layouts/AccentHeaderLayout';
import { Authenticated } from '../components/Authenticated';

import DashboardReportsContent from '../content/DashboardPages/reports';

// https://stackoverflow.com/questions/70717224/how-to-define-a-custom-base-path-when-nextauth-url-doesnt-work
// https://next-auth.js.org/tutorials/refresh-token-rotation
function DashboardReports(props) {
  const { data: session, status } = useSession();
  console.log(session, props.session);
  return (
    <Authenticated session={session}>
      <Head>
        <title>Reports Dashboard</title>
      </Head>
      <DashboardReportsContent />
    </Authenticated>
  );
}

DashboardReports.getLayout = (page) => {
    return (
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    );
}


export const getServerSideProps = async (context) => {
  // get the session
  const session = await getSession(context);

  // // passing the session object to the page  
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
