/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Container, Flex, Button, Select, Grid, Box } from 'theme-ui';
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag"

// import local libraries
import {GenericDropdown} from '../generic/dropdown';
import { i18nextHeader } from "@transitionpt/translations";

// import styles
import {topBarStyles as styles } from './topbar.style';
//import * as FontAwesome from 'react-icons/fa';

export default function TopBar({className}) {
    // const mdIcon = FontAwesome['FaBeer'];
    // console.log(React.createElement(mdIcon))

    const langOptions = [
        {label: "United States", key: "en", icon: <ReactCountryFlag className="emojiFlag" countryCode="US" svg/>},
        {label: "Portugal", key: "pt", icon: <ReactCountryFlag className="emojiFlag" countryCode="PT" svg/>},
    ];

    const handleLanguage = (langValue) => {
        console.log(langValue);
        const customEvent = new CustomEvent('newLang', { detail: langValue });
        window.dispatchEvent(customEvent);
    }

    return (
        <div sx={styles.container}>
            <Container sx={styles.innerContainer}>
                <Grid gap={2} columns={[2, null, 0]}>
                    <Box sx={styles.gridBox}>
                        <p><span className='fa fa-arrow-left'></span>test { i18nextHeader.t('Header.TOPBAR.welcome', { username: 'Joao' }) }</p>
                    </Box>
                    <Box sx={styles.gridBox}>
                        <div sx={styles.smallboxRight}>
                        <GenericDropdown onChangedOption={handleLanguage} items={langOptions} defaultOption={<>{langOptions[1].icon} {langOptions[1].label}</>} ariaLabel="select your language" name="select-language-drop" className={'selectbox-right'}/>
                        </div>
                    </Box>
                </Grid>
            
            
            </Container>
        </div>
    );
}