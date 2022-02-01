/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

import { AboutStyles as styles } from './about.style';

export default function About() {

    return (
        <section id="about" sx={styles.about}>
            <Container>
                <Box sx={styles.aboutMainHeader}>
                    <h2>Transição Portugal</h2>
                    <p>Aproximar as diferenças para uma transição social, económica, interior e exterior que beneficie todos</p>
                </Box>
                <Flex sx={styles.aboutGrid}>
                    <Box sx={styles.aboutGridColumn}>
                        <figure>

                        </figure>
                        <div>
                            <h3>test sfgfdgf</h3>
                        </div>
                    </Box>
                    <Box sx={styles.aboutGridColumn}>
                        test
                    </Box>
                    <Box sx={styles.aboutGridColumn}>
                        test
                    </Box>
                    <Box sx={styles.aboutGridColumn}>
                        test
                    </Box>
                </Flex>
            </Container>
        </section>
    );
}