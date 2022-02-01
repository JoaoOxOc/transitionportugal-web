import React, { useEffect, useState } from "react";

import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import { StickyProvider } from '../contexts/app/app.provider';
import Layout from '../layouts/AppModernLayout';
import dynamic from "next/dynamic";

import SEO from '../components/seo';

// page sections
const BannerDynamic = dynamic(() => import("../pageSections/banner/banner"));
const AboutDynamic = dynamic(() => import("../pageSections/about/about"));
const AccessibilityDynamic = dynamic(() => import("../pageSections/sidebars/accessibility"));
const DonationDynamic = dynamic(() => import("../pageSections/sidebars/donations"));
const NewsDynamic = dynamic(() => import("../pageSections/sidebars/news"));

export default function Home() {

  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO title="Transição Portugal" />
          <AccessibilityDynamic posRight={'0px'} posTop={'200px'}/>
          <DonationDynamic posRight={'0px'} posTop={'300px'}/>
          <NewsDynamic posRight={'0px'} posTop={'400px'}/>
          <BannerDynamic/>
          <AboutDynamic/>
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  )
}
