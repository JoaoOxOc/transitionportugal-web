/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Container, Flex, Button, Select } from 'theme-ui';
import React, { useEffect, useState } from "react";
import { keyframes } from '@emotion/react';
import { Link } from 'react-scroll';

import { DrawerProvider } from '../../contexts/drawer/drawer.provider';

import menuItems from './header.data';
import TopBar from './topbar';

import { i18nextCommon } from "@transitionpt/translations";

export default function Header({className}) {
    const [currentLang, setLang] = useState("pt");
    i18nextCommon.changeLanguage(currentLang);

    return (
        <DrawerProvider>
          <TopBar/>
            <header sx={styles.header} className={className} id="header">
                <Container sx={styles.container}>
                  <Flex as="nav" sx={styles.nav}>
                    {menuItems.map(({ path, label }, i) => (
                      <Link
                        activeClass="active"
                        to={path}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        key={i}
                      >
                        {label}
                      </Link>
                    ))}
                  </Flex>
                  {/* <Logo src={className === 'sticky' ? LogoDark : LogoWhite} /> */}

                  {/* <Flex as="nav" sx={styles.nav}>
                      {menuItems.map(({ path, label }, i) => (
                      <Link
                          activeClass="active"
                          to={path}
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}
                          key={i}
                      >
                          {label}
                      </Link>
                      ))}
                  </Flex>
                  {!session && (
                      <>
                      Not signed in <br />
                      <button onClick={signIn}>Sign in</button>
                      </>
                  )}
                  {session && (
                      <>
                      Signed in as {session.user.email} <br />
                      <button onClick={microFrontLogout}>Sign out</button>
                      </>
                  )}
                  <ProfileDropdown/> */}
                  {/* <Button
                      className="donate__btn"
                      variant="secondary"
                      aria-label="Get Started"
                  >
                      Get Started
                  </Button> */}

                  {/* <MobileDrawer /> */}
                </Container>
            </header>
        </DrawerProvider>
        // <div>
        //     <p>this is header generic module { i18nextCommon.t('Notification.DOWNLOAD.success') }</p>
        //     <button onClick={changeHeaderLanguage}>Change language</button>
        // </div>
    )
}

const positionAnim = keyframes`
  from {
    position: fixed;
    opacity: 1;
  }
  to {
    position: absolute;
    opacity: 1;
    transition: all 0.4s ease;
  }
`;

const styles = {
  header: {
    color: 'white',
    fontWeight: 'normal',
    py: 4,
    width: '100%',
    position: 'absolute',
    top: '20px',//change for topbar height
    left: 0,
    backgroundColor: 'transparent',
    transition: 'all 0.5s ease',
    animation: `${positionAnim} 0.4s ease`,
    '.donate__btn': {
      flexShrink: 0,
      mr: [15, 20, null, null, 0],
      ml: ['auto', null, null, null, 0],
    },
    '&.sticky': {
      position: 'fixed',
      backgroundColor: 'background',
      color: '#000000',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
      py: 3,
      'nev > a': {
        color: 'text',
      },
      '.donate__btn': {
        borderColor: 'primary',
        color: 'primary',
        '&:hover': {
          boxShadow: 'rgba(31, 62, 118, 0.57) 0px 9px 20px -5px',
          backgroundColor: 'primary',
          color: 'white',
        },
      },
    },
    '.profile__menu': {
      flexShrink: 0,
      mr: [15, 20, null, null, 0],
      ml: ['auto', null, null, null, 0],
    },
    select: {
      "& option": {
        backgroundColor:  'white',
        color: 'black',
      }
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nav: {
    mx: 'auto',
    display: 'none',
    '@media screen and (min-width: 1024px)': {
      display: 'block',
    },
    a: {
      fontSize: '16px',
      fontWeight: '400',
      px: 25,
      cursor: 'pointer',
      lineHeight: '1.2',
      '&.active': {
        color: 'secondary',
      },
    },
    div: {
        display: 'block',
    },
  },
};