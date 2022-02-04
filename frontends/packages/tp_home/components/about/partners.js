/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import PartnerCard from './partnercard';

import usePartnerData from '../../hooks/usePartnerData';

import { PartnersStyles as styles } from './partners.style';

export default function Partners() {
    const {data, loading, error} = usePartnerData('');

    return (
        <div sx={styles.partners}>
            <Box sx={styles.partnerTitle}>
                <h2>Os nossos parceiros</h2>
            </Box>
            <Container sx={styles.partnerContainer}>
                    <Box sx={styles.partnerContainerRow}>
                        { data != null && data.map(({id, name, picture, link, description},i) => (
                            <Box key={i}>
                                <PartnerCard
                                    src={picture}
                                    alt={name}
                                    name={name}
                                    link={link}
                                    description={description}
                                />
                            </Box>

                        ))}
                    </Box>
            </Container>
        </div>
    );
}