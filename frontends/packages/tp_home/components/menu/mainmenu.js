/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from '../../components/generic/link';
import { CustomLink } from '../../components/generic/link';

import { i18nextHeader } from "@transitionpt/translations";

import RootMenuList from './rootmenulist';
import { MainMenuStyles as styles } from './mainmenu.style';

//import menu data
import menuItems from '../menu/mainmenu.data';

export default function MainMenu({displayType, isMobile}) {
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

    const renderPageLink = (path, label, icon, index, isSubmenu) => {
        return (
            <Link
                path={path}
                key={index}
                aria-label={ i18nextHeader.t(label) }
                style={{padding: '10px', color: 'inherit', textDecoration: 'none', display: 'inline-block'}}
                >
                <span style={{fontSize: isSubmenu ? '12px' : "inherit"}}>{icon} { i18nextHeader.t(label) }</span>
            </Link>
        )
    }

    const renderScrollLink = (path, label, type, display, icon, i, isSubmenu) => {
        if (router.pathname.split('/')[1] != '') {
            return (
                <CustomLink 
                    path={"/#" + path}
                    key={i}
                    aria-label={ i18nextHeader.t(label) }
                    style={{padding: '10px', color: 'inherit', textDecoration: 'none'}}
                >
                    <span style={{fontSize: isSubmenu ? '12px' : "inherit"}}>{icon} { i18nextHeader.t(label) }</span>
                </CustomLink>
            );
        }
        else {
            return (
                <ScrollLink
                    activeClass={!isSubmenu ? "active" : ""}
                    to={path}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    key={i}
                    aria-label={ i18nextHeader.t(label) }
                    style={{padding: '10px'}}
                    >
                    <span style={{fontSize: isSubmenu ? '12px' : "inherit"}}>{icon} { i18nextHeader.t(label) }</span>
                </ScrollLink>
            );
        }
    }

    return (
        <div sx={Object.assign({}, styles.mainMenuContainer, displayStyle)}>
            {menuItems.map(({ path, label, type, display, submenu, icon }, i) => (
                display != 'bottom' && (
                    type === 'page' && !submenu ?
                        (renderPageLink(path, label, icon, i, false))
                        : (!submenu ? renderScrollLink(path, label, type, display, icon, i, false) : (<RootMenuList key={i} renderScrollLink={renderScrollLink} renderPageLink={renderPageLink} path={path} label={label} type={type} display={display} icon={icon} index={i} submenuOptions={submenu} isMobile={isMobile}/>))
                )
            ))}
        </div>
    );
}