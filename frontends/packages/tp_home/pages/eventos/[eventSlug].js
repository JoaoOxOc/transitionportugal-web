import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { ThemeProvider } from 'theme-ui';
import Image from 'next/image';
import theme from '../../theme';
import { StickyProvider } from '../../contexts/app/app.provider';
import Layout from '../../layouts/AppModernLayout';
import dynamic from "next/dynamic";

import { i18nextEvents } from "@transitionpt/translations";

// page sections
import SEO from '../../components/seo';
import PageTitle from "../../components/pageTitle";
import EventDetailsSection from "../../pageSections/events/eventDetails";
import DynamicPageSection from "../../pageSections/dynamic";
const ContactDynamic = dynamic(() => import("../../pageSections/contact/contact"));
const FooterDynamic = dynamic(() => import("../../pageSections/footer/footer"),{ ssr: false });
const MapDynamic = dynamic(() => import("../../components/map/map"), {ssr: false});

function EventDetails({eventDetailData}) {
    const router = useRouter();
    const [currentLang, setLang] = useState("pt");
    i18nextEvents.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
    }, []);
    const eventDetailDataAttributes = eventDetailData.data && eventDetailData.data[0] ? eventDetailData.data[0].attributes : {};
    console.log('evento Attributes: ', eventDetailDataAttributes);

    const getComponentAttributes = (componentName) => {
        if (eventDetailDataAttributes) {
            return eventDetailDataAttributes[componentName];
        }
        return {};
    }

    const getComponentAttributesByIdentifiers = (componentNamesArray, identifier) => {
        if (eventDetailDataAttributes) {
            let componentBlockArray = eventDetailDataAttributes.Blocks.filter((block) => {
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
        return {};
    }

    const eventImageLoader = ({ src, width, quality }) => {
        return `https://example.com/${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <ThemeProvider theme={theme}>
            <StickyProvider>
            <Layout>
                <SEO metaDataObject={getComponentAttributes("seo")}/>
                {eventDetailDataAttributes &&
                <>
                    <section section id="eventDynamicSection">
                        <div style={{width: '100%', maxWidth: '1280px', margin: '0 auto'}}>
                            <img
                                style={{width: '100%'}}
                                src={eventDetailDataAttributes.EventImageUrl}
                                alt={i18nextEvents.t('EVENTS.eventImageAlt')}
                            />
                        </div>
                        <EventDetailsSection details={eventDetailDataAttributes} slug={router.query.eventSlug}/>
                        <PageTitle pageTitle={eventDetailDataAttributes.Title}/>
                        <DynamicPageSection dynamicContent={getComponentAttributesByIdentifiers(["page.dynamic-page-section","page.sliders"], "")}/>
                    </section>
                    <section id="eventLocation">
                        <PageTitle pageTitle={i18nextEvents.t('EVENTS.eventLocation')}/>
                        <MapDynamic markersData={[{lat: eventDetailDataAttributes.Latitude, long: eventDetailDataAttributes.Longitude, title: eventDetailDataAttributes.EventTitle}]} useSearch={false} zoom={14}/>
                    </section>
                </>
                }
                <ContactDynamic/>
                <FooterDynamic/>
            </Layout>
            </StickyProvider>
        </ThemeProvider>
    );
}

// This function gets called at run time on server-side.
export async function getServerSideProps(context) {
    console.log("eventos router params: ", context.params);
    const res = await fetch(process.env.SSR_CMS_BASE_URL+'/api/event-pages?filters[slug][$eq]=' + context.params.eventSlug + '&locale=pt-PT&populate=deep', {
        method: 'GET',
        headers: {
        Authorization:
            'Bearer ' + process.env.CMS_API_TOKEN,
        }}
    );
    const eventDetailData = await res.json();
    console.log("eventos server eventDetailData: ", eventDetailData);

    return {
        props: {
        eventDetailData,
        },
    }
}

export default EventDetails;