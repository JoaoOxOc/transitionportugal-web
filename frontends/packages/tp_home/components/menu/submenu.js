/** @jsxImportSource theme-ui */
import React from "react";

import { SubMenuStyles as styles } from './submenu.style';

import Newsletter from '../../components/newsletter/newsletter';

export default function SubMenu({displayType}) {
    return (
        <>
            <div sx={styles.subMenuSection}>
                <Newsletter/>
            </div>
            <div sx={styles.subMenuSection}>
                <p>Tópicos importantes</p>
                <p>FAQs</p>
                <p>Contactos</p>
            </div>
        </>
    );
}