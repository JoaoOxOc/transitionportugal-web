/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Container, Flex } from 'theme-ui';
import React, { useEffect, useState } from "react";

import MainMenu from '../menu/mainmenu';
import Logo from '../logo';
import UserBanner from '../user/UserBanner';

import { DrawerProvider } from '../../contexts/drawer/drawer.provider';
import ResponsiveDrawer from '../menu/sidemenu';

import {headerStyles as styles } from './header.style';

//import images
import LogoDark from '../../public/logotipo_transicaoportugal.svg';
//import LogoWhite from '../../assets/logo.svg';
import UserLogoDark from '../../public/user_icon.svg';

export default function Header({className}) {
    const [windowSize, setWindowSizeVar] = useState(0);
  
    useEffect(() => {
        setWindowSizeVar(window.innerWidth);
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 1024 && windowSize > 1024) {
                setWindowSizeVar(window.innerWidth);
            }
            else if (window.innerWidth >= 1024 && windowSize < 1024) {
              setWindowSizeVar(window.innerWidth);
            }
        });
    }, [windowSize]);

    return (
        <DrawerProvider>
            <header sx={styles.header} className={className} id="header">
                <div sx={styles.topLine}/>
                <Container sx={styles.container}>
                    {className === 'sticky' 
                      ? <Logo sx={styles.stickyLogo} src={LogoDark} path={'home'}/>
                      : <></>
                    }
                    <Flex as="nav" sx={styles.nav}>
                        <MainMenu displayType={'displayBlock'}/>
                    </Flex>
                    <ResponsiveDrawer/>
                    {className === 'sticky' && windowSize > 1219
                      ? <UserBanner src={UserLogoDark} className={ 'inlineBlock' } />
                      : <></>
                    }
                </Container>
                <div sx={styles.bottomLine}/>
            </header>
        </DrawerProvider>
    )
}
