import React, { useEffect, useState } from "react";

import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import { StickyProvider } from '../contexts/app/app.provider';
import Layout from '../layouts/AppModernLayout';
import dynamic from "next/dynamic";

import usePartnerData from '../../hooks/usePartnerData';

import SEO from '../components/seo';

// page sections
import MapSection from "../pageSections/map/map";
const FooterDynamic = dynamic(() => import("../pageSections/footer/footer"),{ ssr: false });

export default function Map() {
  const {data, loading, error} = usePartnerData('');

    return (
      <ThemeProvider theme={theme}>
        <StickyProvider>
          <Layout>
            <MapSection markersData={data}/>
            <FooterDynamic/>
          </Layout>
        </StickyProvider>
      </ThemeProvider>
    )
  }