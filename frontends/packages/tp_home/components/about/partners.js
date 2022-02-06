/** @jsxImportSource theme-ui */

import { useState, useEffect } from 'react';
import { Container, Box } from 'theme-ui';
import { Slide } from "react-awesome-reveal";
import { i18nextPartner } from "@transitionpt/translations";
import PartnerCard from './partnercard';

import usePartnerData from '../../hooks/usePartnerData';

import { PartnersStyles as styles } from './partners.style';

export default function Partners() {
    const [currentLang, setLang] = useState("pt");
    i18nextPartner.changeLanguage(currentLang);

    const {data, loading, error} = usePartnerData('');

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
        <div sx={styles.partners}>
            <Box sx={styles.partnerTitle}>
                <Slide direction='down'>
                    <div>
                        <h2>{i18nextPartner.t('PARTNER.partners')}</h2>
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