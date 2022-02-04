/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import { Slide, Fade } from "react-awesome-reveal";
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
                    <Fade>
                        <div>
                            <div sx={styles.actionsBigBannerContainer}>
                                <h3>{data.title}</h3>
                                <p sx={styles.actionsBigBannerMessage}>{data.description}</p>
                            </div>
                        </div>
                    </Fade>
                }
                <Box sx={styles.actionsCenterBox}>
                    <Slide direction='up'>
                        <div>
                            <Button sx={styles.actionsCenterBox.actionsCenterContent} aria-label="Regista-te">Regista-te</Button>
                        </div>
                    </Slide>
                </Box>
            </Flex>
            <Flex sx={styles.actionsBigBanner}>
                { data != null &&
                    <Fade>
                        <div>
                            <div sx={styles.actionsBigBannerContainer}>
                                <h3>{data.donationTitle}</h3>
                                <p sx={styles.actionsBigBannerMessage}>{data.donationDescription}</p>
                            </div>
                        </div>
                    </Fade>
                }
                <Box sx={styles.actionsCenterBox}>
                    <Slide direction='up'>
                        <div>
                            <Button sx={styles.actionsCenterBox.actionsCenterContent} aria-label="Ver Donativos">Ver Donativos</Button>
                        </div>
                    </Slide>
                </Box>
            </Flex>
            <StaffTeam/>
            <Partners/>
        </section>
    );
}