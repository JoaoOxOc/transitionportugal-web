/** @jsxImportSource theme-ui */

import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import Carousel from "react-multi-carousel";
//const ModalVideo = dynamic(() => import('react-modal-video'), { ssr: false });
import { Link } from '../../components/generic/link';
//import { FaPlayCircle } from 'react-icons/fa';

import {bannerStyles as styles } from './banner.styles';
import { CarouselResponsive as responsive } from './banner.styles';

import { BannerDataAction } from '../../contexts/banner/banner.provider';

import { i18nextCommon } from "@transitionpt/translations";

import EcoMap from '../../components/bannerInteraction/ecomap';

const GlassCarouselDynamic = dynamic(() => import("../../components/glassCarousel/glasscarousel"));
import "react-multi-carousel/lib/styles.css";

export default function Banner({sliderComponentObject}) {
//   const { t } = useTranslation('header');
//   console.log('translations ',t('description'));
  const [videoOpen, setVideoOpen] = useState(false);
  const [{ bannerData, isLoading, isError }, doFetch] = BannerDataAction(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );

  const handleClick = (e) => {
    e.preventDefault();
    setVideoOpen(true);
  };

  const parseSliderData = (id,slider) => {
    console.log(slider + "")
    let figureElement = "";
    if (slider.includes("<figure")) {
      figureElement = slider.match(new RegExp("<figure" + "(.*)" + "figure>"));
    }
    const slideText = slider.match(new RegExp("</figure>" + "(.*)"));
    
    console.log(slideText)
    return (
      <div key={id}>
        {parse(figureElement[0])}
        {slideText && slideText.length > 1 &&
          <div sx={styles.bannerCarousel.textOverlay}>
            {parse(slideText[1])}
          </div>
        }
      </div>
    )
  }
  return (
    <section sx={styles.banner} style={{
      backgroundImage:
        "url(" + bannerData.bannerData.bannerImage + ")",
    }} id="home">
      <Carousel sx={styles.bannerCarousel}
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        arrows={false}
                        ssr={true} // means to render carousel on server-side.
                        infinite={false}
                        responsive={responsive}
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
                        { sliderComponentObject.Sliders.map(({id, sliderData},i) => (
                            parseSliderData(id,sliderData)
                        ))}
                </Carousel>
      {/* <Container sx={styles.banner.container}>
        <Box sx={styles.banner.contentBox}> */}
          {/* <Heading as="h1" variant="tpPrimary">
            Interaja com este espaço e descubra a transição
          </Heading> */}
          {/* <Text as="p" variant="tpSecondary">
            Interaja com este espaço e descubra a transição
          </Text> */}
          {/* <Flex style={{width: '100%'}}>
            <GlassCarouselDynamic/>
          </Flex> */}
          {/* <Flex> */}
            {/* <Button variant="whiteButton" aria-label="Get Started">
              Get Started
            </Button> */}
            {/* <>
              <ModalVideo
                channel="youtube"
                isOpen={videoOpen}
                videoId="ZNA9rmDsYVE"
                onClose={() => setVideoOpen(false)}
              />
              <Button
                variant="textButton"
                aria-label="Watch Video"
                onClick={handleClick}
              >
                <FaPlayCircle /> Watch Video
              </Button>
            </> */}
          {/* </Flex> */}
          {/* <Flex sx={styles.sponsorBox}>
            <Text sx={styles.sponsorTitle}>Sponsored by:</Text>
            <Box sx={styles.sponsorBox.sponsor}>
              {bannerData.bannerData.bannerSponsors.map((item, index) => (
                <Link path={item.path} key={`client-key${index}`}>
                  <Image src={item.image} alt={item.title} />
                </Link>
              ))}
            </Box>
          </Flex> */}
        {/* </Box>
      </Container> */}

      <EcoMap />
    </section>
  );
}

