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

export default function Home() {

  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO title="Transição Portugal" />
          <AccessibilityDynamic posRight={'0px'} posTop={'170px'}/>
          <DonationDynamic posRight={'0px'} posTop={'250px'}/>
          <NewsDynamic posRight={'0px'} posTop={'320px'}/>
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
