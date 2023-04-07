import { useState, useCallback, useEffect } from 'react';

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

function EventDetails() {
    const router = useRouter();
    const [currentLang, setLang] = useState("pt");
    i18nextEvents.changeLanguage(currentLang);
    const [currentEvent, setCurrentEvent] = useState({});

    console.log('event slug: ', router.query.eventSlug);

    const getEventData = useCallback(async () => {
        try {
            const response = await fetch("/api/eventsData?slug="+router.query.eventSlug, {
                method: 'GET',
            })
            const responseData = await response.json();
            responseData.data.forEach(element => {
              setCurrentEvent(element);
            });
          } catch (err) {
            setCurrentEvent({});
            console.error(err);
          }
    }, [router.query.eventSlug]);

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
        getEventData();
    }, [getEventData]);

    console.log('evento: ', currentEvent.attributes);
    const getComponentAttributes = (componentName) => {
        if (currentEvent && currentEvent.attributes) {
            return currentEvent.attributes[componentName];
        }
        return {};
    }

    const getComponentAttributesByIdentifiers = (componentNamesArray, identifier) => {
        if (currentEvent && currentEvent.attributes) {
            let componentBlockArray = currentEvent.attributes.Blocks.filter((block) => {
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
                {currentEvent && currentEvent.attributes &&
                <>
                    <div style={{width: '100%', maxWidth: '1280px', margin: '0 auto'}}>
                        <img
                            style={{width: '100%'}}
                            src={currentEvent.attributes.EventImageUrl}
                            alt={i18nextEvents.t('EVENTS.eventImageAlt')}
                        />
                    </div>
                    <EventDetailsSection details={currentEvent.attributes} slug={router.query.eventSlug}/>
                    <PageTitle pageTitle={currentEvent.attributes.Title}/>
                    <DynamicPageSection dynamicContent={getComponentAttributesByIdentifiers(["page.dynamic-page-section","page.sliders"], "")}/>
                    <section id="eventLocation">
                        <PageTitle pageTitle={i18nextEvents.t('EVENTS.eventLocation')}/>
                        <MapDynamic markersData={[{lat: currentEvent.attributes.Latitude, long: currentEvent.attributes.Longitude, title: currentEvent.attributes.EventTitle}]} useSearch={false} zoom={14}/>
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

export default EventDetails;