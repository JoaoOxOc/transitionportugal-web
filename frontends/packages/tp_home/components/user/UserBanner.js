/** @jsxImportSource theme-ui */
import { Image, Button } from 'theme-ui';
import { useEffect, useState, useCallback } from "react";
import { Link } from '../generic/link';
import { useAuth } from '../../hooks/useAuth';
import { i18nextHeader } from "@transitionpt/translations";

// import styles
import {UserBannerStyles as styles } from './UserBanner.style';

//import images and icons
import {BiCaretDown} from 'react-icons/bi';
import UserOptionsList from './userOptions';

export default function UserBanner({ src, className, ...rest }) {
    const auth = useAuth();
    const [userAuthenticated, setUserAuthenticated] = useState(auth.user);
    if (auth.isAuthenticated && userAuthenticated == null) {
        setUserAuthenticated(auth.user);
    }

    const innerContain = className === 'inlineBlock' ? styles.userContainer.userInlineBlock 
                            : (className === 'sidemenu' ? styles.userContainer.userSidemenu : styles.userContainer.userTopBlock);

    const [currentLang, setLang] = useState("pt");
    i18nextHeader.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            //setMessages((currentMessages) => currentMessages.concat(event.detail));
            console.log(event);
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    });

    // structure example:
    // { expiration: 1659216971
    // name: "Administrator"
    // token: ""
    // username: "admin" }

    const renderUsernameContent = (noImage, menuMargin) => {
        if (userAuthenticated && userAuthenticated.username) {
            return (
                <div sx={styles.userContainer}>
                    <div sx={styles.userAuthenticatedMenu} style={{margin: menuMargin ? '0 auto': '0'}} aria-label={(i18nextHeader.t('Header.TOPBAR.welcomeInfo'))}>
                        <UserOptionsList label={(i18nextHeader.t('Header.TOPBAR.welcomeInfo'))}>
                            <div sx={styles.userAuthenticatedMenu.userOptionsButton} title="transicao portugal user menu">
                                <div sx={innerContain}>
                                    <div sx={styles.userAuthenticatedMenu.usernameContainer}>
                                        <span sx={styles.userAuthenticatedMenu.usernameContainer.userIdSpan}>{ i18nextHeader.t('Header.TOPBAR.welcome', { username: userAuthenticated.name }) }</span><BiCaretDown/>
                                    </div>
                                    {!noImage &&
                                        <div sx={styles.userContainer.userImage}>
                                            <Image src={src} alt="User" />
                                        </div>
                                    }
                                </div>
                            </div>
                        </UserOptionsList>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div sx={styles.userContainer}>
                    <Link
                        path={process.env.NEXT_PUBLIC_HOME_BASE_URL + "/admin/auth/login/cover"}
                        aria-label={ i18nextHeader.t('Header.TOPBAR.loginLinkInfo') }
                        style={{color: 'inherit', position: 'relative', margin: '0px auto', cursor: 'pointer', textDecoration: 'none', padding: 0, display: 'inline-block'}}
                        >
                        {/* <span style={{fontSize: "inherit"}}>{ i18nextHeader.t('Header.TOPBAR.login') }</span> */}
                        <Button style={{maxHeight: '100%', padding: '13px 30px', borderRadius: '.25rem', borderTopLeftRadius: '0.25rem', borderTopRightRadius: '0.25rem', borderBottomRightRadius: '0.25rem', borderBottomLeftRadius: '0.25rem'}}>
                            <span style={{fontSize: "inherit"}}>{ i18nextHeader.t('Header.TOPBAR.enter') }</span>
                        </Button>
                    </Link>
                </div>
            );
        }
    }

    const renderBlock = () => {
        return (
            <div sx={styles.userContainerTopBar}>
                {renderUsernameContent()}
            </div>
        );
    }

    const renderSidemenuBlock = () => {
        return (
            <>
                <div sx={styles.userContainer.userImage}>
                    <Image src={src} alt="User" />
                </div>
                <div style={{margin: '0 110px'}}>
                    {renderUsernameContent(true, true)}
                </div>
            </>
        );
    }

    return (
        // renderUserOptions()
        className === 'block'
        ? renderBlock()
        : (className === 'sidemenu' ? renderSidemenuBlock() : renderUsernameContent())
    );
}