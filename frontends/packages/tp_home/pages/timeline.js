import React, { useEffect, useState } from "react";

import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import { StickyProvider } from '../contexts/app/app.provider';
import Layout from '../layouts/AppModernLayout';
import dynamic from "next/dynamic";

import { i18nextTimeline } from "@transitionpt/translations";

// page sections
import SEO from '../components/seo';
import PageTitle from "../components/pageTitle";
import TimelinePageSection from "../pageSections/timeline";
const ContactDynamic = dynamic(() => import("../pageSections/contact/contact"));
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

    const getComponentAttributesByIdentifiers = (componentNamesArray, identifier) => {
      let componentBlockArray = timelinePageDataAttributes.Blocks.filter((block) => {
        let isRightBlock = componentNamesArray.includes(block["__component"]);
        if (identifier) {
          isRightBlock = isRightBlock && block["Identifier"] === identifier;
        }
        if (isRightBlock)
          return block;
      });
      console.log(componentBlockArray);
      return componentBlockArray;
  }

    return (
      <ThemeProvider theme={theme}>
        <StickyProvider>
          <Layout>
            <SEO metaDataObject={getComponentAttributes("seo")}/>
            <PageTitle pageTitle={i18nextTimeline.t("TIMELINE_PAGE.title")}/>
            <TimelinePageSection timelineCardsContent={getComponentAttributesByIdentifiers(["page.dynamic-page-section","page.sliders"], "")}/>
            <ContactDynamic/>
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
  const res = await fetch(process.env.SSR_CMS_BASE_URL+'/api/pages?filters[slug][$eq]=timeline&locale=pt-PT&populate=deep', {
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