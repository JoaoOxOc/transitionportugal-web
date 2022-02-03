/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Container, Flex, Button, Select } from 'theme-ui';
import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from 'react-scroll';
import { Link } from '../../components/generic/link';

import { i18nextHeader } from "@transitionpt/translations";

import { MainMenuStyles as styles } from './mainmenu.style';

//import menu data
import menuItems from '../menu/mainmenu.data';

export default function MainMenu({displayType}) {
    const displayStyle = displayType === 'displayBlock' ? styles.displayBlock : styles.displayGrid;
    const [currentLang, setLang] = useState("pt");
    i18nextHeader.changeLanguage(currentLang);

    useEffect(() => {
          const handleNewMessage = (event) => {
            //setMessages((currentMessages) => currentMessages.concat(event.detail));
            console.log(event);
            setLang(event.detail);
          };
                
          window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
        <div sx={Object.assign({}, styles.mainMenuContainer, displayStyle)}>
            {menuItems.map(({ path, label, type, display, icon }, i) => (
                display != 'bottom' && (
                type === 'page' ?
                    <Link
                        path={path}
                        key={i}
                        aria-label={ i18nextHeader.t(label) }
                        style={{padding: '10px', color: 'inherit', textDecoration: 'none'}}
                        >
                        <span>{icon} { i18nextHeader.t(label) }</span>
                    </Link>
                
                : <ScrollLink
                    activeClass="active"
                    to={path}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    key={i}
                    aria-label={ i18nextHeader.t(label) }
                    style={{padding: '10px'}}
                    >
                    <span>{icon} { i18nextHeader.t(label) }</span>
                </ScrollLink>
                )
            ))}
        </div>
    );
}