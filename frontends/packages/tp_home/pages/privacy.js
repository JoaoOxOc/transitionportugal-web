import React, { useEffect, useState } from "react";

import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import {
    Box,
    Grid,
    Typography,
    Divider
  } from '@material-ui/core';
import { COLORS as colors } from '../theme/parameters';
import { StickyProvider } from '../contexts/app/app.provider';
import Layout from '../layouts/AppModernLayout';
import dynamic from "next/dynamic";

import SEO from '../components/seo';
import { GetPublicTerms } from '../services/terms';

// page sections
import EditorViewerFragmentsWrapper from "../components/EditorComponent/ViewerFragments";
import { i18nextTermsDetails } from "@transitionpt/translations";
import UnderConstructionSection from "../pageSections/underConstruction";
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

    console.log(privacyPageDataAttributes, termsProps);
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
            <Box sx={{pt: "50px"}}>
                <Typography variant="h3" style={{textAlign: 'center', paddingBottom: "10px"}}>
                {t("READING.termsAndConditions")}
                </Typography>
                <Divider/>
                <Grid container sx={{pt: "10px", pb: "20px"}}>
                    <Grid item>
                        <EditorViewerFragmentsWrapper termsLanguages={termsProps.terms.termsLanguages}/>
                    </Grid>
                </Grid>
                <Divider/>
            </Box>
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
    const res = await fetch(process.env.SSR_CMS_BASE_URL+'/api/pages?populate=deep&slug=privacy&locale=pt-PT', {
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