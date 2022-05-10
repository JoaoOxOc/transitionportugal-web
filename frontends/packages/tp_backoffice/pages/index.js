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
  console.log(session, props);
  return (
    <>
      <Head>
        <title>Reports Dashboard</title>
      </Head>
      <DashboardReportsContent />
    </>
  );
}

DashboardReports.getLayout = (page) => {
  const { props } = page;
    return (
      <Authenticated session={props.children.props.session}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authenticated>
    );
}


export const getServerSideProps = async ({req}) => {
  // get the session
  const session = await getSession({ req });
  const t = JSON.stringify(req.cookies);

  // // passing the session object to the page  
  return { props: {session: session, request: req.cookies} };
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
