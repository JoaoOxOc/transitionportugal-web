/** @jsxImportSource theme-ui */

import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import {FaRegUserCircle} from 'react-icons/fa';
import {MdPlace} from 'react-icons/md';
import {GoCalendar} from 'react-icons/go';
import { format } from 'date-fns';

import { EventDetailsStyles as styles } from './eventDetails.style';
import { i18nextEvents } from "@transitionpt/translations";

import "react-multi-carousel/lib/styles.css";

export default function EventDetailsSection({details}) {

    return (
        <Container sx={styles.eventDetailsSectionContainer}>
            <div sx={styles.parsedSectionContainer}>
                <div sx={styles.sectionCard}>
                    <Flex sx={styles.eventInfoGrid}>
                        <Box px={2} >
                            <span><FaRegUserCircle sx={styles.eventInfoIcon}/></span> Por: Transição Portugal
                        </Box>
                        <Box px={2} >
                            <span><MdPlace sx={styles.eventInfoIcon}/></span> {details.EventPlace}
                        </Box>
                        { details.EventEndDate && details.EventEndDate != '' && 
                            <Box px={2}>
                                <span><GoCalendar sx={styles.eventInfoIcon}/></span>&nbsp;{i18nextEvents.t('LABELS.eventFrom')} {format(new Date(details.EventStartDate), 'dd/MM/yyyy')} {i18nextEvents.t('LABELS.eventTo')} {format(new Date(details.EventEndDate), 'dd/MM/yyyy')}
                            </Box>
                        }
                        {(!details.EventEndDate || details.EventEndDate == '') &&
                            <Box px={2}>
                            <span><GoCalendar sx={styles.eventInfoIcon}/></span> {format(new Date(details.EventStartDate), 'dd/MM/yyyy')}
                            </Box>
                        }
                    </Flex>
                </div>
            </div>
        </Container>
    );
}