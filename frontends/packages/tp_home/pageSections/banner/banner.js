/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
//const ModalVideo = dynamic(() => import('react-modal-video'), { ssr: false });
import { Link } from '../../components/generic/link';
//import { FaPlayCircle } from 'react-icons/fa';

import {bannerStyles as styles } from './banner.styles';

import { BannerDataAction } from '../../contexts/banner/banner.provider';

import { i18nextCommon } from "@transitionpt/translations";

export default function Banner() {
//   const { t } = useTranslation('header');
//   console.log('translations ',t('description'));
  const [videoOpen, setVideoOpen] = useState(false);
  const [{ bannerData, isLoading, isError }, doFetch] = BannerDataAction(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );
  console.log('banner data', bannerData);
  const handleClick = (e) => {
    e.preventDefault();
    setVideoOpen(true);
  };
  return (
    <section sx={styles.banner} style={{
      backgroundImage:
        "url(" + bannerData.bannerData.bannerImage + ")",
    }} id="home">
      <Container sx={styles.banner.container}>
        <Box sx={styles.banner.contentBox}>
          <Heading as="h1" variant="tpPrimary">
          {bannerData.bannerData.bannerTitle}
          </Heading>
          <Text as="p" variant="tpSecondary">
          {bannerData.bannerData.bannerSubtitle}
          </Text>
          <Text as="p" variant="tpSecondary">
          {bannerData.bannerData.bannerSubtitleSignature} { i18nextCommon.t('Notification.DOWNLOAD.success') }
          </Text>
          <Flex>
            <Button variant="whiteButton" aria-label="Get Started">
              Get Started
            </Button>
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
          </Flex>
          <Flex sx={styles.sponsorBox}>
            <Text sx={styles.sponsorTitle}>Sponsored by:</Text>
            <Box sx={styles.sponsorBox.sponsor}>
              {bannerData.bannerData.bannerSponsors.map((item, index) => (
                <Link path={item.path} key={`client-key${index}`}>
                  <Image src={item.image} alt={item.title} />
                </Link>
              ))}
            </Box>
          </Flex>
        </Box>

        <Box sx={styles.banner.imageBox}>
          <Image src={bannerData.bannerData.bannerThumb} alt="banner" />
        </Box>
      </Container>
    </section>
  );
}

