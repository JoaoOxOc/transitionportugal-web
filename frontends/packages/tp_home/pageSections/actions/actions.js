/** @jsxImportSource theme-ui */

import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState, useEffect } from 'react';
import { i18nextActions } from "@transitionpt/translations";
import { Slide, Fade } from "react-awesome-reveal";
import StaffTeam from '../../components/about/staffteam';
import Partners from '../../components/about/partners';

import useActionsData from '../../hooks/useActionsData';

import { ActionsStyles as styles } from './actions.style';

export default function Actions() {
    const [currentLang, setLang] = useState("pt");
    i18nextActions.changeLanguage(currentLang);

    const {data, loading, error} = useActionsData('');

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
    }, []);

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
                            <Button sx={styles.actionsCenterBox.actionsCenterContent} aria-label={i18nextActions.t('ACTIONS.regist_button')}>{i18nextActions.t('ACTIONS.regist_button')}</Button>
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
                            <Button sx={styles.actionsCenterBox.actionsCenterContent} aria-label={i18nextActions.t('ACTIONS.open_donations')}>{i18nextActions.t('ACTIONS.open_donations')}</Button>
                        </div>
                    </Slide>
                </Box>
            </Flex>
            <StaffTeam/>
            <Partners/>
        </section>
    );
}