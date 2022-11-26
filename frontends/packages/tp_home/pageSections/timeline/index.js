/** @jsxImportSource theme-ui */
import { Container } from 'theme-ui';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';

import { TimelinePageSectionStyles as styles } from './timeline.style';

export default function TimelinePageSection({timelineCardsContent}) {

    return (
        <Container sx={styles.timelinePageSectionContainer}>
            
        </Container>
    );
}