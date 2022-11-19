import React, { useEffect, useState } from "react";

import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import { StickyProvider } from '../contexts/app/app.provider';
import Layout from '../layouts/AppModernLayout';
import dynamic from "next/dynamic";

import SEO from '../components/seo';

// page sections
import UnderConstructionSection from "../pageSections/underConstruction";
const FooterDynamic = dynamic(() => import("../pageSections/footer/footer"),{ ssr: false });

export default function TimelinePage({timelinePageData}) {
    const [currentLang, setLang] = useState("pt");
    useEffect(() => {
      const handleNewMessage = (event) => {
        setLang(event.detail);
      };
            
      window.addEventListener('newLang', handleNewMessage);
    }, []);
    const timelinePageDataAttributes = timelinePageData.data && timelinePageData.data[0] ? timelinePageData.data[0].attributes : {};

    console.log(timelinePageDataAttributes);
    const getComponentAttributes = (componentName) => {
        return timelinePageDataAttributes[componentName];
    }

    const getComponentAttributesByIdentifier = (componentName, identifier) => {
        let componentBlockArray = timelinePageDataAttributes.Blocks.filter((block) => {
          if (block["__component"] === componentName && block["Identifier"] === identifier)
            return block;
        });
        console.log(componentBlockArray);
        return componentBlockArray[0];
    }

    return (
      <ThemeProvider theme={theme}>
        <StickyProvider>
          <Layout>
            <SEO metaDataObject={getComponentAttributes("seo")}/>
            <UnderConstructionSection/>
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
  // TODO: process nextjs selected language
  const res = await fetch(process.env.SSR_CMS_BASE_URL+'/api/pages?populate=deep&slug=timeline&locale=pt-PT', {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer ' + process.env.CMS_API_TOKEN,
    }}
    );
  const timelinePageData = await res.json();

  return {
    props: {
      timelinePageData,
    },
  }
}