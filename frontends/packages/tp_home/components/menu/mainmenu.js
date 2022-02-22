/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from '../../components/generic/link';
import { CustomLink } from '../../components/generic/link';

import { i18nextHeader } from "@transitionpt/translations";

import { MainMenuStyles as styles } from './mainmenu.style';

//import menu data
import menuItems from '../menu/mainmenu.data';

export default function MainMenu({displayType}) {
    const router = useRouter();
    const displayStyle = displayType === 'displayBlock' ? styles.displayBlock : styles.displayGrid;
    const [currentLang, setLang] = useState("pt");
    i18nextHeader.changeLanguage(currentLang);

    useEffect(() => {
          const handleNewMessage = (event) => {
            //setMessages((currentMessages) => currentMessages.concat(event.detail));
            setLang(event.detail);
          };
                
          window.addEventListener('newLang', handleNewMessage);
    }, []);

    const renderScrollLink = (path, label, type, display, icon, i) => {
        if (router.pathname.split('/')[1] != '') {
            return (
                <CustomLink 
                    path={"/#" + path}
                    key={i}
                    aria-label={ i18nextHeader.t(label) }
                    style={{padding: '10px', color: 'inherit', textDecoration: 'none'}}
                >
                    <span>{icon} { i18nextHeader.t(label) }</span>
                </CustomLink>
            );
        }
        else {
            return (
                <ScrollLink
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
            );
        }
    }

    return (
        <div sx={Object.assign({}, styles.mainMenuContainer, displayStyle)}>
            {menuItems.map(({ path, label, type, display, icon }, i) => (
                display != 'bottom' && (
                type === 'page' ?
                    (<Link
                        path={path}
                        key={i}
                        aria-label={ i18nextHeader.t(label) }
                        style={{padding: '10px', color: 'inherit', textDecoration: 'none', display: 'inline-block'}}
                        >
                        <span>{icon} { i18nextHeader.t(label) }</span>
                    </Link>)
                
                : (renderScrollLink(path, label, type, display, icon, i))
                )
            ))}
        </div>
    );
}