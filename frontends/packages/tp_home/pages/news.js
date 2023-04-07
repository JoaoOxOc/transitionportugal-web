import React, { useEffect, useState } from "react";

import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import { StickyProvider } from '../contexts/app/app.provider';
import Layout from '../layouts/AppModernLayout';
import dynamic from "next/dynamic";

import SEO from '../components/seo';

// page sections
import UnderConstructionSection from "../pageSections/underConstruction";
const ContactDynamic = dynamic(() => import("../pageSections/contact/contact"));
const FooterDynamic = dynamic(() => import("../pageSections/footer/footer"),{ ssr: false });

export default function NewsPage() {

    return (
      <ThemeProvider theme={theme}>
        <StickyProvider>
          <Layout>
            <UnderConstructionSection/>
            <ContactDynamic/>
            <FooterDynamic/>
          </Layout>
        </StickyProvider>
      </ThemeProvider>
    )
  }