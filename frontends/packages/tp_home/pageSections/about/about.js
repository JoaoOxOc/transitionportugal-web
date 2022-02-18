/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

import { AboutStyles as styles } from './about.style';

export default function About() {

    return (
        <section id="about" sx={styles.about}>
            <Container>
                <p>test</p>
            </Container>
        </section>
    );
}