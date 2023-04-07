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

export default function GlassCarousel({slides, fullWidth, customHeight}) {
    console.log('slides', slides, fullWidth, customHeight)
    // const {data,loading,error} = useBannerData('https://localhost:4000');

    const parseSliderData = (sliderData, identifier) => {
        let figureElement = null;
        if (sliderData.includes("<figure")) {
            figureElement = sliderData.match(new RegExp("<figure" + "(.*)" + "figure>"));
        }
        if (!figureElement) {
            figureElement = sliderData.match(new RegExp("<p.*?><img" + "(.*?)" + "><\/p>"));
        }
        const sliderTextSplitted = sliderData.split(new RegExp(/<h.*?>(.*)<\/h.*?>/g));
        const sliderTextSplittedCount = sliderTextSplitted.length;
        const sliderTitle = sliderData.match(new RegExp(/<h.*?>(.*)<\/h.*?>/g));
        const sliderParagraphs = sliderTextSplittedCount > 1 ? sliderTextSplitted[sliderTextSplittedCount - 1].match(new RegExp(/<p.*?>(.*?)<\/p>/g)) : sliderData.match(new RegExp(/<p.*?>(.*?)<\/p>/g));
        
        return (
            <InfoCard 
                key={identifier}
                label={sliderTitle}
                paragraphs={sliderParagraphs}
                imgElement={figureElement}
            ></InfoCard>
        );
    }

    return (
        <div sx={{...(fullWidth ? styles.carouselCardFullWidth : styles.carouselCardDynamicWidth), ...(customHeight? styles.carouselCardInheritHeight : styles.carouselCardDefaultHeight), ...styles.carouselCard}}>
            <Box sx={styles.carouselBox}>
                { slides != null &&
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
                        { slides.map(({sliderData,id}) => (
                            parseSliderData(sliderData,id)))
                        }
                </Carousel>
                }
            </Box>
        </div>
    );
}