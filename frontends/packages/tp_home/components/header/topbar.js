/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Container, Grid, Box } from 'theme-ui';
import React, { useEffect, useState } from "react";

// import local libraries
import { i18nextHeader } from "@transitionpt/translations";
import Language from '../../components/language/language';
import Logo from '../logo';
import UserBanner from '../user/UserBanner';
import SocialLinkBar from '../../components/social/linkbar'

// import styles
import {topBarStyles as styles } from './topbar.style';
//import * as FontAwesome from 'react-icons/fa';

//import images and icons
import LogoDark from '../../public/logotipo_transicaoportugal.svg';
//import LogoWhite from '../../assets/logo.svg';
import UserLogoDark from '../../public/user_icon.svg';

export default function TopBar({className}) {

    const [currentLang, setLang] = useState("pt");
    i18nextHeader.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            //setMessages((currentMessages) => currentMessages.concat(event.detail));
            console.log(event);
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    });

    // const mdIcon = FontAwesome['FaBeer'];
    // console.log(React.createElement(mdIcon))

    return (
        <div sx={styles.container}>
            <Container sx={styles.innerContainer}>
                <Grid gap={2} columns={[3, null, '1fr 1fr 1fr']}>
                    <Box sx={styles.gridBox}>
                        <SocialLinkBar/>
                    </Box>
                    <Box>
                        <Container sx={styles.boxContainer}>
                            <div sx={styles.boxContainer.boxInnerContainer}>
                                <Logo src={LogoDark} />
                            </div>
                        </Container>
                    </Box>
                    <Box sx={Object.assign({}, styles.gridBox, styles.moveNegativeLeft, styles.moveNegativeRight)}>
                        <Grid columns={[2, null, 0]}  sx={Object.assign({}, styles.subGrid)}>
                            <Box sx={Object.assign({}, styles.subGridBox)}>
                                <div sx={Object.assign({}, styles.smallboxRight)}>
                                    <Language/>
                                </div>
                            </Box>
                            <Box sx={styles.subGridBox}>
                                <div sx={Object.assign({}, styles.loginBox)}>
                                    <UserBanner src={UserLogoDark} className={ 'block' }/>
                                </div>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </Container>
        </div>
    );
}