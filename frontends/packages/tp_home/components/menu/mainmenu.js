/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Container, Flex, Button, Select } from 'theme-ui';
import React, { useEffect, useState } from "react";
import { Link } from 'react-scroll';

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
            {menuItems.map(({ path, label, icon }, i) => (
                <Link
                    activeClass="active"
                    to={path}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    key={i}
                    style={{padding: '10px'}}
                    >
                    <span>{icon} { i18nextHeader.t(label) }</span>
                </Link>
            ))}
        </div>
    );
}