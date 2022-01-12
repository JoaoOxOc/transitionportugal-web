/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Container, Flex, Button, Select } from 'theme-ui';
import React, { useEffect, useState } from "react";
import { Link } from 'react-scroll';

import { DrawerProvider } from '../../contexts/drawer/drawer.provider';

import {headerStyles as styles } from './header.style';

import menuItems from './header.data';

import { i18nextCommon } from "@transitionpt/translations";

export default function Header({className}) {

    return (
        <DrawerProvider>
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
