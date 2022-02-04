/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Heading, Box, Container, Image, Flex } from 'theme-ui';
import React, { useState, useEffect } from 'react';
import { Slide, Fade } from "react-awesome-reveal";
import { Link as ScrollLink } from 'react-scroll';
import { Link } from '../../components/generic/link';
import Logo from '../../components/logo';
import Newsletter from '../../components/newsletter/newsletter';
import SocialLinkBar from '../../components/social/linkbar';
import ContactCard from '../../components/contacts/contactcard';
import menuItems from './footer.data';

//import bottom menu data
import bottomMenuItems from '../../components/menu/mainmenu.data';

import { FooterStyles as styles } from './footer.style';

import { i18nextFooter } from "@transitionpt/translations";

//import images
import LogoDark from '../../public/logotipo_transicaoportugal.svg';

export default function Footer() {
  const [currentLang, setLang] = useState("pt");
  i18nextFooter.changeLanguage(currentLang);

  useEffect(() => {
      const handleNewMessage = (event) => {
        //setMessages((currentMessages) => currentMessages.concat(event.detail));
        setLang(event.detail);
      };
            
      window.addEventListener('newLang', handleNewMessage);
  }, []);
  return (
    <footer sx={styles.footer}>
      <Container sx={styles.footer.container}>
        <Box sx={styles.footer.footerTopArea}>
          <Box sx={styles.footer.menus}>
            <Heading sx={styles.footer.heading}>
              <figure>
                <Fade>
                  <Image src='/about/inner-transition.png' alt={ i18nextFooter.t('Footer.OPTIONS.inner_transition_alt') }/>
                </Fade>
              </figure>
            </Heading>
            <Slide direction='left'>
              <Newsletter/>
            </Slide>
            <Box mt={7}>
                <Slide direction='up'>
                  <SocialLinkBar/>
                </Slide>
            </Box>
          </Box>
          <Box sx={styles.footer.menus}>
            <Heading sx={styles.footer.heading}>
              <figure>
                <Fade>
                  <Image src='/about/transition-towns.png' alt={ i18nextFooter.t('Footer.OPTIONS.contacts_alt') }/>
                </Fade>
              </figure>
              { i18nextFooter.t('Footer.OPTIONS.contacts') }
            </Heading>
            <Slide direction='up'>
              <ContactCard/>
            </Slide>
          </Box>
          <Box sx={styles.footer.menus}>
            <Heading sx={styles.footer.heading}>
              <figure>
                <Fade>
                  <Image src='/about/circular-economy-icon-green.png' alt={ i18nextFooter.t('Footer.OPTIONS.privacy_alt') }/>
                </Fade>
              </figure>
              { i18nextFooter.t('Footer.OPTIONS.privacy') }
            </Heading>
            {menuItems.map(({ header, items }, i) => (
              <Box sx={styles.footer.menus} key={i}>
                <Flex sx={styles.footer.navWrapper}>
                  <Slide direction='right'>
                    <nav>
                      {items.map(({ path, label, icon }, i) => (
                        <Link
                          path={path}
                          key={i}
                          aria-label={ i18nextFooter.t(label) }
                          sx={styles.footer.link}
                        >
                          <span>{icon} { i18nextFooter.t(label) }</span>
                        </Link>
                      ))}
                    </nav>
                  </Slide>
                </Flex>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
      <Slide direction='up'>
        <Container>
          <Box sx={styles.footer.footerBottomArea}>
              <div sx={styles.footer.footerBottomTrademark}>
                  <Logo src={LogoDark} path={'home'}/>
                  <span aria-label={ i18nextFooter.t('Footer.BOTTOM.copyright_help') } sx={styles.footer.footerBottomSpan}>Copyright &copy; Transição Portugal 2022</span>
              </div>
              <Box sx={styles.footer.bottomMenus}>
                <nav>
                  {bottomMenuItems.map(({ path, label, icon, type, display }, i) => (
                    display != 'header' && (
                    type === 'page' ?
                      <Link
                        path={path}
                        key={i}
                        aria-label={ i18nextFooter.t(label) }
                        sx={styles.footer.bottomLink}
                      >
                      <span>{icon} { i18nextFooter.t(label) }</span>
                      </Link>
                    :
                    <ScrollLink
                      to={path}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      key={i}
                      sx={styles.footer.bottomLink}
                      aria-label={ i18nextFooter.t(label) }
                    >
                      <span>{icon} { i18nextFooter.t(label) }</span>
                    </ScrollLink>
                    )
                  ))}
                </nav>
            </Box>
          </Box>
        </Container>
      </Slide>
    </footer>
  );
}