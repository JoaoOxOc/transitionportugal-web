/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme/muitheme';

import { GlassCarouselStyles as styles } from './glasscarousel.style';

import SwipeableTextMobileStepper from './swipeableview';

export default function GlassCarousel() {

    return (
        <div sx={styles.carouselCard}>
            <Box sx={styles.carouselBox}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <SwipeableTextMobileStepper/>
                </ThemeProvider>
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