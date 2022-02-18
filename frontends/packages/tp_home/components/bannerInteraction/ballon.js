/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

import { BallonStyles as styles } from './ballon.style';

export default function Ballon() {

    return (
        <div sx={styles.ballonCard}>
            <Box sx={styles.ballonBox}>
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