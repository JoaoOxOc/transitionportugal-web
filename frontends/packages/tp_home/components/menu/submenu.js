/** @jsxImportSource theme-ui */
import React from "react";
import { useRouter } from 'next/router';

import { SubMenuStyles as styles } from './submenu.style';

import Newsletter from '../../components/newsletter/newsletter';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from '../../components/generic/link';
import { CustomLink } from '../../components/generic/link';
import footerMenuItems from '../../pageSections/footer/footer.data';
import { i18nextFooter } from "@transitionpt/translations";

export default function SubMenu({displayType, sitemapLayout}) {
  const router = useRouter();
  const displayStyle = displayType === 'displayBlock' ? styles.displayBlock : styles.displayGrid;

  const renderScrollLink = (path, label, type, display, icon, i) => {
    if (router.pathname.split('/')[1] != '') {
        return (
            <CustomLink 
                path={"/#" + path}
                key={i}
                aria-label={ i18nextFooter.t(label) }
                sx={styles.bottomLink}
                style={{padding: '10px', color: 'inherit', textDecoration: 'none', paddingLeft: '25px'}}
            >
                <span>{icon} { i18nextFooter.t(label) }</span>
            </CustomLink>
        );
    }
    else {
        return (
          <ScrollLink
            to={path}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            key={i}
            sx={styles.bottomLink}
            aria-label={ i18nextFooter.t(label) }
          >
            <span>{icon} { i18nextFooter.t(label) }</span>
          </ScrollLink>
        );
    }
  }

    return (
        <>
            {!sitemapLayout &&
            <div sx={styles.subMenuSection}>
                <Newsletter/>
            </div>
            }
            <div sx={styles.subMenuSection}>
            {footerMenuItems.map(({ header, items }, i) => (
                <nav key={i} sx={displayStyle}>
                      {items.map(({ type, display, path, label, icon }, index) => (
                        type === 'component' ? (renderScrollLink(path, label, type, display, icon, i))
                         : (
                        <Link
                          path={path}
                          key={''+(index+1)+''+(i+1)}
                          aria-label={ i18nextFooter.t(label) }
                          sx={styles.bottomLink}
                        >
                          <span>{icon} { i18nextFooter.t(label) }</span>
                        </Link>)
                      ))}
                </nav>
            ))}
                {/* <p>Tópicos importantes</p>
                <p>FAQs</p>
                <p>Contactos</p> */}
            </div>
        </>
    );
}