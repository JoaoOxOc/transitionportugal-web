/** @jsxImportSource theme-ui */

import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import { Slide, Fade, Pulse } from "react-awesome-reveal";
import { i18nextAbout } from "@transitionpt/translations";

import useAboutData from '../../hooks/useAboutData';
const GlassCarouselDynamic = dynamic(() => import("../../components/glassCarousel/glasscarousel"));

import { AboutStyles as styles } from './about.style';

import AboutMainimage from '../../public/about/about-mainimage.jpg';

export default function About({aboutComponentObject}) {
    const [currentLang, setLang] = useState("pt");
    i18nextAbout.changeLanguage(currentLang);

    // const {data, loading, error} = useAboutData('');

    const parseSectionHeader = () => {
        const headerText = aboutComponentObject.SectionTitle;
        const headerParagraph = aboutComponentObject.SectionParagraphs;
        return (
            <>
                {parse(headerText)}
                {parse(headerParagraph)}
            </>
        )
    }

    const parseAboutDataObject = () => {
        let tableRows = null;
        if (aboutComponentObject.SectionContent.includes("<table")) {
            tableRows = aboutComponentObject.SectionContent.match(new RegExp(/<tr>(.*?)<\/tr>/g));
        }
        const rowsCount = tableRows.length; //TODO: set grid based upon rows quantity and columns quantity
        let sectionColumns = [];
        tableRows.forEach((tableRow, rowIndex) => {
            const rowColumns = tableRow.match(new RegExp(/<td>(.*?)<\/td>/g));
            rowColumns.forEach((column, columnIndex) => {
                let figureElement = null;
                if (column.includes("<figure")) {
                    figureElement = column.match(new RegExp("<figure" + "(.*)" + "figure>"));
                }
                const columnHeader = column.match(new RegExp(/<h.*?>(.*)<\/h.*?>/g));
                const columnParagraph = column.match(new RegExp(/<p.*?>(.*?)<\/p>/g));
                sectionColumns.push(<Box sx={styles.aboutGridColumn} key={''+(rowIndex+1)+''+(columnIndex+1)}>
                    <Slide direction='up'>
                        {figureElement && parse(figureElement[0])}
                        <div>
                            <div sx={styles.aboutGridColumnText}>
                                {columnHeader && parse(columnHeader[0])}
                                {columnParagraph && parse(columnParagraph[0])}
                            </div>
                        </div>
                    </Slide>
                </Box>);
            });
        });
        return (
            <>
                {sectionColumns.map((element) => (
                    element
                ))}
            </>
        );
    }

    const parseMessageSection = () => {
        let quotedMessage = "";
        if (aboutComponentObject.SectionMessage.includes("<blockquote")) {
            quotedMessage = aboutComponentObject.SectionMessage.match(new RegExp("<blockquote" + "(.*)" + "blockquote>"));
        }
        const paragraphs = aboutComponentObject.SectionMessage.match(new RegExp(/<p.*?>(.*?)<\/p>/g));
        const paragraphsCount = paragraphs.length;
        console.log(paragraphs)
        return(
        <div sx={styles.aboutBigBannerContainer}>
            <Fade>
                <div>
                    <div sx={styles.aboutBigBannerMessage}>{parse(quotedMessage[0])}</div>
                </div>
            </Fade>
            <Fade>
                <div>
                    <div sx={styles.aboutBigBannerInlineContent}>
                        <div sx={styles.aboutBigBannerInlineImage}>
                            {paragraphsCount > 2 && paragraphs[paragraphsCount-3].includes('<img') ? parse(paragraphs[paragraphsCount-3]) : <></>}
                        </div>
                        <div sx={styles.aboutBigBannerInlineDetails}>
                            <div sx={styles.aboutBigBannerAuthor}>{parse(paragraphs[paragraphsCount > 1 ? paragraphsCount-2 : 1])}</div>
                            <div sx={styles.aboutBigBannerAuthorInfo}>{parse(paragraphs[paragraphsCount > 0 ? paragraphsCount-1 : 0])}</div>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
        );
    }

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
        <section id="about" sx={styles.about}>
            <Container>
                <Flex sx={styles.aboutGrid}>
                    <Fade>
                        <Box>
                            <div sx={styles.aboutMainHeader}>
                                {parseSectionHeader()}
                            </div>
                        </Box>
                    </Fade>
                    <Box sx={styles.aboutGridImageBox}>
                        <Container sx={styles.aboutCarousel.container}>
                            <Box sx={styles.aboutCarousel.contentBox}>
                                <Flex style={{'margin': '0 auto'}}>
                                    <Fade>
                                        <GlassCarouselDynamic slides={aboutComponentObject.sliders}/>
                                        {/* <Image src={AboutMainimage} alt={i18nextAbout.t('ABOUT.community_image')}/> */}
                                    </Fade>
                                </Flex>
                            </Box>
                        </Container>
                    </Box>
                </Flex>
                <Flex sx={styles.aboutTopicsGrid}>
                    {parseAboutDataObject()}
                </Flex>
                <Flex sx={styles.aboutCenterBox}>
                    <Slide direction='up'>
                        <div>
                            <Button sx={styles.aboutCenterBox.aboutCenterContent} aria-label={i18nextAbout.t('ABOUT.timeline')}>{i18nextAbout.t('ABOUT.timeline')}</Button>
                        </div>
                    </Slide>
                </Flex>
            </Container>
                <Flex sx={styles.aboutBigBanner}>
                    {parseMessageSection()}
                </Flex>
        </section>
    );
}