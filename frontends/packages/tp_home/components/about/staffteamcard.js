/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

import { StaffTeamCardStyles as styles } from './staffteamcard.style';

export default function StaffTeamCard({
    src,
    alt,
    name,
    job,
    description,
  }) {

    return (
        <div sx={styles.staffteamCard}>
            <Container sx={styles.staffteamContainer}>
                <Flex sx={styles.staffteamContainerRow}>

                </Flex>
            </Container>
        </div>
    );
}