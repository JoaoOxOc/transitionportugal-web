/** @jsxImportSource theme-ui */

import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';

import { EventDetailsStyles as styles } from './eventDetails.style';

import "react-multi-carousel/lib/styles.css";

export default function EventDetailsSection({details}) {

    return (
        <Container sx={styles.eventDetailsSectionContainer}>
            <div sx={styles.parsedSectionContainer}>
                <div sx={styles.sectionCard}>
                    
                </div>
            </div>
        </Container>
    );
}