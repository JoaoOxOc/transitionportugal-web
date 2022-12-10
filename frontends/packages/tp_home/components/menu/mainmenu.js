/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Link as ScrollLink } from 'react-scroll';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from '../../components/generic/link';
import { CustomLink } from '../../components/generic/link';

import { i18nextHeader } from "@transitionpt/translations";

import RootMenuList from './rootmenulist';
import { MainMenuStyles as styles } from './mainmenu.style';

//import menu data
import menuItems from '../menu/mainmenu.data';

export default function MainMenu({displayType, isMobile, baseTabIndex}) {
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

    const incrementBaseTabIndex = (newBaseIndex) => {
        baseTabIndex +=newBaseIndex+1;
    }

    const renderPageLink = (path, label, ariaLabel, icon, index, currentTabIndex, isSubmenu, isMobile, handleCloseMenuFunction) => {
        return (
            !isMobile ? (
                <Link
                    path={path}
                    key={index}
                    tabIndex={currentTabIndex+index}
                    aria-label={ i18nextHeader.t(ariaLabel) }
                    style={{padding: '0px', width: '100%', color: 'inherit', textDecoration: 'none', display: 'inline-block'}}
                >
                    <MenuItem key={'MenuItem'+index} onClick={handleCloseMenuFunction}><span style={{fontSize: isSubmenu ? '14px' : "inherit", padding: '8px 0px 8px 0px'}}>{icon} { i18nextHeader.t(label) }</span></MenuItem>
                </Link>
            ):(
                <Link
                    path={path}
                    key={index}
                    tabIndex={currentTabIndex+index}
                    aria-label={ i18nextHeader.t(ariaLabel) }
                    style={{padding: '10px', width: isSubmenu ? '100%' : 'inherit', color: 'inherit', textDecoration: 'none', display: 'inline-block'}}
                    >
                    <span style={{fontSize: isSubmenu ? '12px' : "inherit"}}>{icon} { i18nextHeader.t(label) }</span>
                </Link>
            )
        )
    }

    const renderScrollLink = (path, label, ariaLabel, type, display, icon, i, currentTabIndex, isSubmenu, isMobile, handleCloseMenuFunction) => {
        if (router.pathname.split('/')[1] != '') {
            return (
                !isMobile ? (
                    <CustomLink 
                            path={"/#" + path}
                            key={i}
                            tabIndex={currentTabIndex + i}
                            aria-label={ i18nextHeader.t(ariaLabel) }
                            style={{padding: '0px', width: '100%',color: 'inherit',textDecoration: 'none', display: 'inline-block'}}
                    >
                        <MenuItem key={'MenuItem'+i} onClick={handleCloseMenuFunction}><span style={{fontSize: isSubmenu ? '14px' : "inherit", padding: '8px 0px 8px 0px'}}>{icon} { i18nextHeader.t(label) }</span></MenuItem>
                    </CustomLink>
                ):(
                    <CustomLink 
                            path={"/#" + path}
                            key={i}
                            tabIndex={currentTabIndex + i}
                            aria-label={ i18nextHeader.t(ariaLabel) }
                            style={{padding: '10px', color: 'inherit', textDecoration: 'none'}}
                    >
                        <span style={{fontSize: isSubmenu ? '12px' : "inherit"}}>{icon} { i18nextHeader.t(label) }</span>
                    </CustomLink>
                )
            );
        }
        else {
            return (
                    !isMobile ? (
                        <ScrollLink
                            activeClass={!isSubmenu ? "active" : ""}
                            to={path}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            key={i}
                            tabIndex={currentTabIndex + i}
                            aria-label={ i18nextHeader.t(ariaLabel) }
                            style={{padding: '0px', width: '100%',color: 'inherit',textDecoration: 'none', display: 'inline-block'}}
                            >
                                <MenuItem key={'MenuItem'+i} onClick={handleCloseMenuFunction}><span style={{fontSize: isSubmenu ? '14px' : "inherit", padding: '8px 0px 8px 0px'}}>{icon} { i18nextHeader.t(label) }</span></MenuItem>
                        </ScrollLink>
                    ):(
                        <ScrollLink
                            activeClass={!isSubmenu ? "active" : ""}
                            to={path}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            key={i}
                            tabIndex={currentTabIndex + i}
                            aria-label={ i18nextHeader.t(ariaLabel) }
                            style={{padding: '10px', width: '100%'}}
                            >
                                <span style={{fontSize: isSubmenu ? '12px' : "inherit"}}>{icon} { i18nextHeader.t(label) }</span>
                        </ScrollLink>
                    )
            );
        }
    }

    return (
        <div sx={Object.assign({}, styles.mainMenuContainer, displayStyle)}>
            {menuItems.map(({ path, label, ariaLabel, type, display, submenu, icon }, i) => (
                display != 'bottom' && (
                    type === 'page' && !submenu ?
                        (renderPageLink(path, label, ariaLabel, icon, i, baseTabIndex, false, true, null))
                        : (!submenu ? renderScrollLink(path, label, ariaLabel, type, display, icon, i, baseTabIndex, false, true, null) : (<RootMenuList key={i} baseTabIndex={baseTabIndex} renderScrollLink={renderScrollLink} renderPageLink={renderPageLink} incrementBaseTabIndex={incrementBaseTabIndex} path={path} label={label} ariaLabel={ariaLabel} type={type} display={display} icon={icon} index={i} submenuOptions={submenu} isMobile={isMobile}/>))
                )
            ))}
        </div>
    );
}