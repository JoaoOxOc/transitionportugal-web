/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import StaffTeamCard from './staffteamcard';

import useStaffteamData from '../../hooks/useStaffteamData';

import { StaffTeamStyles as styles } from './staffteam.style';

export default function StaffTeam() {
    const {data, loading, error} = useStaffteamData('');

    return (
        <div sx={styles.staffteam}>
            <Box sx={styles.staffteamTitle}>
                <h2>A nossa Equipa</h2>
            </Box>
            <Container sx={styles.staffteamContainer}>
                    <Box sx={styles.staffteamContainerRow}>
                        { data != null && data.map(({id, name, picture, job, description},i) => (
                            <Box key={i}>
                                <StaffTeamCard
                                    src={picture}
                                    alt={name}
                                    name={name}
                                    job={job}
                                    description={description}
                                />
                            </Box>

                        ))}
                    </Box>
            </Container>
        </div>
    );
}