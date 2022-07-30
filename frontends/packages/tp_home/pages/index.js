import React, { useEffect, useState } from "react";

import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import { StickyProvider } from '../contexts/app/app.provider';
import Layout from '../layouts/AppModernLayout';
import dynamic from "next/dynamic";

import SEO from '../components/seo';

// page sections
const AccessibilityDynamic = dynamic(() => import("../pageSections/sidebars/accessibility"));
const DonationDynamic = dynamic(() => import("../pageSections/sidebars/donations"));
const NewsDynamic = dynamic(() => import("../pageSections/sidebars/news"));
const BannerDynamic = dynamic(() => import("../pageSections/banner/banner"));
const AboutDynamic = dynamic(() => import("../pageSections/about/about"));
const EventsDynamic = dynamic(() => import("../pageSections/events/events"));
const ActionsDynamic = dynamic(() => import("../pageSections/actions/actions"));
const FooterDynamic = dynamic(() => import("../pageSections/footer/footer"));

export default function Home({homepageData}) {
  const homepageDataAttributes = homepageData.data && homepageData.data[0] ? homepageData.data[0].attributes : {};
  const getComponentAttributes = (componentName) => {
    return homepageDataAttributes[componentName];
  }
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO metaDataObject={getComponentAttributes("seo")}/>
          {/* <AccessibilityDynamic posRight={'0px'} posTop={'170px'}/>
          <DonationDynamic posRight={'0px'} posTop={'250px'}/>
          <NewsDynamic posRight={'0px'} posTop={'320px'}/> */}
          <BannerDynamic/>
          <AboutDynamic/>
          <EventsDynamic/>
          <ActionsDynamic/>
          <FooterDynamic/>
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  )
}

// This function gets called at run time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(process.env.SSR_CMS_BASE_URL+'/api/pages?populate=deep&slug=&locale=pt-PT', {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer ' + process.env.CMS_API_TOKEN,
    }}
    );
  const homepageData = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      homepageData,
    },
  }
}
