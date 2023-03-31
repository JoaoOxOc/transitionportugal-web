import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { ThemeProvider } from 'theme-ui';
import theme from '../../theme';
import { StickyProvider } from '../../contexts/app/app.provider';
import Layout from '../../layouts/AppModernLayout';
import dynamic from "next/dynamic";

import { i18nextAbout } from "@transitionpt/translations";

// page sections
import SEO from '../../components/seo';
import PageTitle from "../../components/pageTitle";
import DynamicPageSection from "../../pageSections/dynamic";
const ContactDynamic = dynamic(() => import("../../pageSections/contact/contact"));
const FooterDynamic = dynamic(() => import("../../pageSections/footer/footer"),{ ssr: false });

function EventDetails() {
    const router = useRouter();
    const [currentLang, setLang] = useState("pt");
    const [currentEvent, setCurrentEvent] = useState({});

    console.log('event slug: ', router.query.eventSlug);

    // const getEventData = useCallback(async () => {
    //     try {
    //         let settingsData = await GetSettingData(process.env.NEXT_PUBLIC_API_BASE_URL + settingsUri, session.accessToken);
    //         if (isMountedRef()) {
    //           if (settingsData.status) {
    //             setSettingsError(settingsData);
    //             setSetting({});
    //           }
    //           else {
    //             setSetting(settingsData);
    //           }
    //         }
    //       } catch (err) {
    //         setSettingsError(err);
    //         console.error(err);
    //       }
    // }, [isMountedRef, settingsUri]);

    // useEffect(() => {
    //     getEventData();
    // }, [getEventData]);

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
    }, []);
    // const aboutusPageDataAttributes = aboutusPageData.data && aboutusPageData.data[0] ? aboutusPageData.data[0].attributes : {};

    // console.log(aboutusPageDataAttributes);
    // const getComponentAttributes = (componentName) => {
    //     return aboutusPageDataAttributes[componentName];
    // }

    return (
        <ThemeProvider theme={theme}>
            <StickyProvider>
            <Layout>
                {/* <SEO metaDataObject={getComponentAttributes("seo")}/> */}
                <PageTitle pageTitle={currentEvent.title}/>
                <ContactDynamic/>
                <FooterDynamic/>
            </Layout>
            </StickyProvider>
        </ThemeProvider>
    );
}

export default EventDetails;