/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import StaffTeam from '../../components/about/staffteam';
import Partners from '../../components/about/partners';

import useActionsData from '../../hooks/useActionsData';

import { ActionsStyles as styles } from './actions.style';

export default function Actions() {
    const {data, loading, error} = useActionsData('');
    console.log(data)

    return (
        <section id="actions" sx={styles.actions}>
            <Flex sx={styles.actionsBigBanner}>
                { data != null &&
                <div sx={styles.actionsBigBannerContainer}>
                    <h3>{data.title}</h3>
                    <p sx={styles.actionsBigBannerMessage}>{data.description}</p>
                </div>
                }
                <Box sx={styles.actionsCenterBox}>
                    <Button sx={styles.actionsCenterBox.actionsCenterContent} aria-label="Regista-te">Regista-te</Button>
                </Box>
            </Flex>
            <Flex sx={styles.actionsBigBanner}>
                { data != null &&
                <div sx={styles.actionsBigBannerContainer}>
                    <h3>{data.donationTitle}</h3>
                    <p sx={styles.actionsBigBannerMessage}>{data.donationDescription}</p>
                </div>
                }
                <Box sx={styles.actionsCenterBox}>
                    <Button sx={styles.actionsCenterBox.actionsCenterContent} aria-label="Ver Donativos">Ver Donativos</Button>
                </Box>
            </Flex>
            <StaffTeam/>
            <Partners/>
        </section>
    );
}