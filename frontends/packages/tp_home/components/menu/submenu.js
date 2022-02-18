/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Container, Flex } from 'theme-ui';
import React from "react";
import { SubMenuStyles as styles } from './submenu.style';

export default function SubMenu({displayType}) {
    return (
        <>
            <div sx={styles.subMenuSection}>
                <p>Subscreva a nossa newsletter</p>
            </div>
            <div sx={styles.subMenuSection}>
                <p>Tópicos importantes</p>
                <p>FAQs</p>
                <p>Contactos</p>
            </div>
        </>
    );
}