import React, { useEffect, useState } from "react";

import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import { StickyProvider } from '../contexts/app/app.provider';
import Layout from '../layouts/AppModernLayout';
import dynamic from "next/dynamic";

// page sections
const BannerDynamic = dynamic(() => import("../pageSections/banner/banner"));

export default function Home() {

  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <BannerDynamic/>
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  )
}
