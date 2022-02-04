/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Box } from 'theme-ui';
import { Slide } from "react-awesome-reveal";
import PartnerCard from './partnercard';

import usePartnerData from '../../hooks/usePartnerData';

import { PartnersStyles as styles } from './partners.style';

export default function Partners() {
    const {data, loading, error} = usePartnerData('');

    return (
        <div sx={styles.partners}>
            <Box sx={styles.partnerTitle}>
                <Slide direction='down'>
                    <div>
                        <h2>Os nossos parceiros</h2>
                    </div>
                </Slide>
            </Box>
            <Container sx={styles.partnerContainer}>
                    <Box sx={styles.partnerContainerRow}>
                        { data != null && data.map(({id, name, picture, link, description},i) => (
                            <Box key={i}>
                                <Slide direction='right'>
                                    <PartnerCard
                                        src={picture}
                                        alt={name}
                                        name={name}
                                        link={link}
                                        description={description}
                                    />
                                </Slide>
                            </Box>

                        ))}
                    </Box>
            </Container>
        </div>
    );
}