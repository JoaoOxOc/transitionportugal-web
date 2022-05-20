/** @jsxImportSource theme-ui */

import { Container, Box } from 'theme-ui';
import { useState, useEffect } from 'react';
import { Slide } from "react-awesome-reveal";
import { i18nextStaff } from "@transitionpt/translations";
import StaffTeamCard from './staffteamcard';

import useStaffteamData from '../../hooks/useStaffteamData';

import { StaffTeamStyles as styles } from './staffteam.style';

export default function StaffTeam() {
    const [currentLang, setLang] = useState("pt");
    i18nextStaff.changeLanguage(currentLang);

    const {data, loading, error} = useStaffteamData('');

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
        <div sx={styles.staffteam}>
            <Box sx={styles.staffteamTitle}>
                <Slide direction='down'>
                <div>
                    <h2>{i18nextStaff.t('STAFF.staffteam')}</h2>
                </div>
                </Slide>
            </Box>
            <Container sx={styles.staffteamContainer}>
                    <Box sx={styles.staffteamContainerRow}>
                        { data != null && data.map(({id, name, picture, job, description},i) => (
                            <Box key={i}>
                                <Slide direction='right'>
                                    <StaffTeamCard
                                        src={picture}
                                        alt={name}
                                        name={name}
                                        job={job}
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