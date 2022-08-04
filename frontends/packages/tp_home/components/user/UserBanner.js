/** @jsxImportSource theme-ui */
import { Image } from 'theme-ui';
import { useEffect, useState, useCallback } from "react";
import { Link } from '../generic/link';
import { i18nextHeader } from "@transitionpt/translations";

// import styles
import {UserBannerStyles as styles } from './UserBanner.style';

//import images and icons
import {BiCaretDown} from 'react-icons/bi';
import UserOptionsList from './userOptions';

export default function UserBanner({ src, className, ...rest }) {
    const [userAuthenticated, setUserAuthenticated] = useState(null);
    const fetchCurrentUserSession = useCallback(async() => {
        try {
            const result = await fetch("https://transicaoportugal.org/admin/api/auth/session", {
                method: 'GET',
                headers: { 
                  "Content-Type": "application/json",
                  "credentials": 'include'
                }
            });
            if (!result.ok) {
                const resultErrorBody = await result.text();
                setUserAuthenticated({});
            }
            else {
                const bodyResponse = await result.json();
                if (bodyResponse && bodyResponse.user) {
                    setUserAuthenticated(bodyResponse.user);
                }
                else {
                    setUserAuthenticated({});
                }
            }
        }
        catch (e) {
            console.log("fetchSessionError ",e);
            setUserAuthenticated({});
        }
    },[]);
    const innerContain = className === 'inlineBlock' ? styles.userContainer.userInlineBlock 
                            : (className === 'sidemenu' ? styles.userContainer.userSidemenu : styles.userContainer.userBlock);

    const [currentLang, setLang] = useState("pt");
    i18nextHeader.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            //setMessages((currentMessages) => currentMessages.concat(event.detail));
            console.log(event);
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
        if (!userAuthenticated) {
            fetchCurrentUserSession();
        }
    });

    // structure example:
    // { expiration: 1659216971
    // name: "Administrator"
    // token: ""
    // username: "admin" }
    console.log(userAuthenticated);

    const renderLinkContent = () => {
        if (userAuthenticated && userAuthenticated.username) {
            return (
                <p aria-label='username welcome'><UserOptionsList label={(i18nextHeader.t('Header.TOPBAR.welcomeInfo'))}><span>{ i18nextHeader.t('Header.TOPBAR.welcome', { username: userAuthenticated.name }) }<BiCaretDown/></span></UserOptionsList></p>
            );
        }
        else {
            return (
                <p>
                    <Link
                        path={"/admin/auth/login/cover"}
                        aria-label={ i18nextHeader.t('Header.TOPBAR.loginLinkInfo') }
                        style={{color: 'inherit', cursor: 'pointer', textDecoration: 'none', padding: 0, display: 'inline-block'}}
                        >
                        <span style={{fontSize: "inherit"}}>{ i18nextHeader.t('Header.TOPBAR.login') }</span>
                    </Link>/<Link
                        path={"/admin/auth/register/wizard"}
                        aria-label={ i18nextHeader.t('Header.TOPBAR.registerLinkInfo') }
                        style={{color: 'inherit', cursor: 'pointer', textDecoration: 'none', padding: 0, display: 'inline-block'}}
                        >
                        <span style={{fontSize: "inherit"}}>{ i18nextHeader.t('Header.TOPBAR.register') }</span>
                    </Link>
                </p>
            );
        }
    }

    const renderBlock = () => {
        return (
            <div sx={styles.userContainer}>
                {userAuthenticated && userAuthenticated.username && (
                    <div sx={innerContain}>
                        <div sx={styles.userContainer.userImage}>
                            <Image src={src} alt="User" />
                        </div>
                        <div>
                            {renderLinkContent()}
                        </div>
                    </div>
                )}
                {(!userAuthenticated || !userAuthenticated.username) && (
                    <div sx={innerContain}>
                        <div sx={styles.userContainer.userImage}>
                                <Image src={src} alt="User" />
                        </div>
                        <div>
                            {renderLinkContent()}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const renderInnerBlock = () => {
        return (
            <div sx={styles.userContainer}>
                <div sx={innerContain}>
                    {renderLinkContent()} 
                    <div sx={styles.userContainer.userInlineImage}>
                        <Image src={src} alt="User" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        className === 'inlineBlock'
        ? renderInnerBlock()
        : renderBlock()
    );
}