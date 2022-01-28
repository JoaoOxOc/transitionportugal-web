/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

import { GlassCarouselStyles as styles } from './glasscarousel.style';

export default function GlassCarousel() {

    return (
        <div sx={styles.carouselCard}>
            <Box sx={styles.carouselBox}>
                <Heading as="h1" variant="tpPrimary">
                    test
                </Heading>
                <Text as="p" variant="tpSecondary">
                    Info sobre estrela clicada
                </Text>
            </Box>
        </div>
    );
}