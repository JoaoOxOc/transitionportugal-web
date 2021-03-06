/** @jsxImportSource theme-ui */

import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState, useEffect } from 'react';
import { Slide, Fade, Pulse } from "react-awesome-reveal";
import { i18nextAbout } from "@transitionpt/translations";

import useAboutData from '../../hooks/useAboutData';

import { AboutStyles as styles } from './about.style';

import AboutMainimage from '../../public/about/about-mainimage.jpg';

export default function About() {
    const [currentLang, setLang] = useState("pt");
    i18nextAbout.changeLanguage(currentLang);

    const {data, loading, error} = useAboutData('');

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
                                { data != null &&
                                <>
                                    <h2>{data.title}</h2>
                                    <p>{data.description}</p>
                                </>
                                }
                            </div>
                        </Box>
                    </Fade>
                    <Box sx={styles.aboutGridImageBox}>
                        <Fade>
                            <Image src={AboutMainimage} alt={i18nextAbout.t('ABOUT.community_image')}/>
                        </Fade>
                    </Box>
                </Flex>
                <Flex sx={styles.aboutTopicsGrid}>
                    { data != null && data.topics.map(({ title, picture, paragraph }, i) => (
                        <Box sx={styles.aboutGridColumn} key={i}>
                            <Slide direction='up'>
                                <figure>
                                    <Image src={picture} alt={title}/>
                                </figure>
                                <div>
                                    <div sx={styles.aboutGridColumnText}>
                                        <h3>{title}</h3>
                                        <p>{paragraph}</p>
                                    </div>
                                </div>
                            </Slide>
                        </Box>
                    ))}
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
                    { data != null &&
                    <div sx={styles.aboutBigBannerContainer}>
                        <Fade>
                            <div>
                                <p sx={styles.aboutBigBannerMessage}>&quot;{data.bigBannerMessage}&quot;</p>
                            </div>
                        </Fade>
                        <Fade>
                            <div>
                                <div sx={styles.aboutBigBannerInlineContent}>
                                    <div sx={styles.aboutBigBannerInlineImage}>
                                    <Image width="150" height="150" src={data.bigBannerAuthorImage} alt={data.bigBannerAuthor}/>
                                    </div>
                                    <div sx={styles.aboutBigBannerInlineDetails}>
                                        <div sx={styles.aboutBigBannerAuthor}>{data.bigBannerAuthor}</div>
                                        <div sx={styles.aboutBigBannerAuthorInfo}>{data.bigBannerAuthorInfo}</div>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    }
                </Flex>
        </section>
    );
}