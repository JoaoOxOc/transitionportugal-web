import React, { useEffect, useState } from "react";

import { ThemeProvider, Container } from 'theme-ui';
import theme from '../theme';
import { StickyProvider } from '../contexts/app/app.provider';
import Layout from '../layouts/AppModernLayout';
import dynamic from "next/dynamic";

import SEO from '../components/seo';
import { GetPublicTerms } from '../services/terms';

// page sections
import TermsPageSection from '../pageSections/terms';
import { i18nextTermsDetails } from "@transitionpt/translations";
import PageTitle from "../components/pageTitle";
const ContactDynamic = dynamic(() => import("../pageSections/contact/contact"));
const FooterDynamic = dynamic(() => import("../pageSections/footer/footer"),{ ssr: false });

export default function PrivacyPage({privacyPageData, termsProps}) {
    const { t } = i18nextTermsDetails;
    const [currentLang, setLang] = useState("pt");
    useEffect(() => {
      const handleNewMessage = (event) => {
        setLang(event.detail);
      };
            
      window.addEventListener('newLang', handleNewMessage);
    }, []);
    const privacyPageDataAttributes = privacyPageData.data && privacyPageData.data[0] ? privacyPageData.data[0].attributes : {};

    console.log(privacyPageDataAttributes);
    const getComponentAttributes = (componentName) => {
        return privacyPageDataAttributes[componentName];
    }

    const getComponentAttributesByIdentifier = (componentName, identifier) => {
        let componentBlockArray = privacyPageDataAttributes.Blocks.filter((block) => {
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
            <PageTitle pageTitle={t("READING.termsAndConditions")}/>
            <TermsPageSection termsContent={termsProps.terms.termsLanguages}/>
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
export async function getServerSideProps(context) {
    const { req } = context;
    // TODO: process nextjs selected language
    const userBrowserLanguage = req.headers ? req.headers['accept-language'].split(",")[0].toLowerCase() : "pt-pt";
    const res = await fetch(process.env.SSR_CMS_BASE_URL+'/api/pages?filters[slug][$eq]=privacy&locale=pt-PT&populate=deep', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer ' + process.env.CMS_API_TOKEN,
      }}
      );
    const privacyPageData = await res.json();
    const termsProps = await GetPublicTerms(userBrowserLanguage);
    return {
      props: {
        privacyPageData,
        termsProps
      },
    }
}