/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import { Slide, Fade, Pulse } from "react-awesome-reveal";

import useAboutData from '../../hooks/useAboutData';

import { AboutStyles as styles } from './about.style';

import AboutMainimage from '../../public/about/about-mainimage.jpg';

export default function About() {
    const {data, loading, error} = useAboutData('');
    console.log(data)

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
                        <Slide direction='right'>
                            <Image src={AboutMainimage} alt='community image'/>
                        </Slide>
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
                            <Button sx={styles.aboutCenterBox.aboutCenterContent} aria-label="Veja a nossa linha do tempo">Veja a nossa linha do tempo</Button>
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