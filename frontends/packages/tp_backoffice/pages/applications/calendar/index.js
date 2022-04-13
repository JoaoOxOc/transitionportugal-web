
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// const CalendarContent = dynamic(
//   () => import('../../../content/Applications/Calendar/CalendarContent'),
//   {
//     ssr: false,
//     loading: () => <p>...</p>,
//   }
// );

import { Authenticated } from '../../../components/Authenticated';
import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';

//read: https://github.com/fullcalendar/fullcalendar/issues/5393
function ApplicationsCalendar() {

  return (
    <>
      <Head>
        <title>Calendar - Applications</title>
      </Head>
      {/* <CalendarContent/> */}
    </>
  );
}

ApplicationsCalendar.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default ApplicationsCalendar;
