/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Container, Flex, Button, Select } from 'theme-ui';
import React, { useEffect, useState } from "react";
import { Link } from 'react-scroll';

import Logo from '../logo';
import UserBanner from '../user/UserBanner';

import { DrawerProvider } from '../../contexts/drawer/drawer.provider';
import MobileDrawer from './mobile-drawer';

import {headerStyles as styles } from './header.style';

import { i18nextHeader } from "@transitionpt/translations";

//import images
import LogoDark from '../../public/tn-logo.svg';
//import LogoWhite from '../../assets/logo.svg';
import UserLogoDark from '../../public/user_icon.svg';

//import header data
import menuItems from './header.data';

export default function Header({className}) {
    console.log(menuItems)
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

    return (
        <DrawerProvider>
            <header sx={styles.header} className={className} id="header">
                  <div sx={styles.topLine}/>
                <Container sx={styles.container}>
                  {className === 'sticky' 
                    ? <Logo sx={styles.stickyLogo} src={LogoDark} />
                    : <></>
                  }
                  <Flex as="nav" sx={styles.nav}>
                    {menuItems.map(({ path, label, icon }, i) => (
                      <Link
                        activeClass="active"
                        to={path}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        key={i}
                      >
                        <span>{icon} { i18nextHeader.t(label) }</span>
                      </Link>
                    ))}
                  </Flex>
                  {className === 'sticky' 
                    ? <UserBanner src={UserLogoDark} className={ 'inlineBlock' } />
                    : <></>
                  }
                  <MobileDrawer />
                </Container>
                <div sx={styles.bottomLine}/>
            </header>
        </DrawerProvider>
        // <div>
        //     <p>this is header generic module { i18nextCommon.t('Notification.DOWNLOAD.success') }</p>
        //     <button onClick={changeHeaderLanguage}>Change language</button>
        // </div>
    )
}
