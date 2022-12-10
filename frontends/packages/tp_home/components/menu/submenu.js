/** @jsxImportSource theme-ui */
import React from "react";

import { SubMenuStyles as styles } from './submenu.style';

import Newsletter from '../../components/newsletter/newsletter';
import { Link } from '../../components/generic/link';
import footerMenuItems from '../../pageSections/footer/footer.data';
import { i18nextFooter } from "@transitionpt/translations";

export default function SubMenu({displayType, sitemapLayout}) {
  const displayStyle = displayType === 'displayBlock' ? styles.displayBlock : styles.displayGrid;
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
                      {items.map(({ path, label, icon }, index) => (
                        <Link
                          path={path}
                          key={''+(index+1)+''+(i+1)}
                          aria-label={ i18nextFooter.t(label) }
                          sx={styles.subMenuSection.link}
                        >
                          <span>{icon} { i18nextFooter.t(label) }</span>
                        </Link>
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