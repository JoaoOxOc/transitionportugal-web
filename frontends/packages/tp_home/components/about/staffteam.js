/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Box } from 'theme-ui';
import { Slide } from "react-awesome-reveal";
import StaffTeamCard from './staffteamcard';

import useStaffteamData from '../../hooks/useStaffteamData';

import { StaffTeamStyles as styles } from './staffteam.style';

export default function StaffTeam() {
    const {data, loading, error} = useStaffteamData('');

    return (
        <div sx={styles.staffteam}>
            <Box sx={styles.staffteamTitle}>
                <Slide direction='down'>
                <div>
                    <h2>A nossa Equipa</h2>
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