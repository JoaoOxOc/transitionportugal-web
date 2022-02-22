/** @jsxImportSource theme-ui */

import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import { Slide } from "react-awesome-reveal";
import Carousel from "react-multi-carousel";
// import SwipeButtonGroup from '../../components/events/swipebuttongroup';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import theme from '../../theme/muitheme';
import InfoCard from "./infocard";
import useBannerData from '../../hooks/useBannerData';

import { GlassCarouselStyles as styles } from './glasscarousel.style';
import { CarouselResponsive as responsive } from './glasscarousel.style';

import "react-multi-carousel/lib/styles.css";

// import SwipeableTextMobileStepper from './swipeableview';

export default function GlassCarousel() {
    const {data,loading,error} = useBannerData('https://localhost:4000');
    return (
        <div sx={styles.carouselCard}>
            <Box sx={styles.carouselBox}>
                { data != null &&
                <Carousel sx={styles.carouselList}
                        swipeable={true}
                        draggable={true}
                        showDots={true}
                        arrows={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={false}
                        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                        additionalTransfrom={0}
                        autoPlaySpeed={3000}
                        centerMode={false}
                        keyBoardControl={true}
                        customTransition="transform 400ms ease-in-out 0s"
                        transitionDuration={400}
                        // removeArrowOnDeviceType={["tablet", "mobile"]}
                        // deviceType={this.props.deviceType}
                        dotListClass="custom-dot-list-style"
                        // renderButtonGroupOutside
                        // customButtonGroup={<SwipeButtonGroup />}
                        minimumTouchDrag={80}
                    >
                        { data.map(({label, paragraphs, imgPath},i) => (
                            <InfoCard 
                            key={i}
                            label={label}
                            paragraphs={paragraphs}
                            imgPath={imgPath}
                            ></InfoCard>
                        ))}
                </Carousel>
                }
                {/* <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    {/* <CssBaseline />
                    <SwipeableTextMobileStepper/>
                </ThemeProvider> */}
                {/* <Heading as="h1" variant="tpPrimary">
                    test
                </Heading>
                <Text as="p" variant="tpSecondary">
                    Info sobre estrela clicada
                </Text> */}
            </Box>
        </div>
    );
}