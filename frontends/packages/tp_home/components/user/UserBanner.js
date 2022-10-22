/** @jsxImportSource theme-ui */
import { Image, Button } from 'theme-ui';
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
                setUserAuthenticated({username: 'joao@hotmail.com', name: 'joao'});
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
            setUserAuthenticated({username: 'joao@hotmail.com', name: 'joao'});
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

    const renderUserOptions = () => {
        return (
        <div sx={styles.userContainer.userOptionsContainer}>
            <div style={{position: 'relative'}}>
                <div style={{display: 'inline'}}>
                    <div sx={styles.userContainer.userOptionsContainer.appsMenuContainer} id="gbwa">
                        <div style={{position: 'relative'}}>
                            <a sx={styles.userContainer.userOptionsContainer.appsMenuContainer.appsMenuButton} aria-label="Google apps" href="https://www.google.pt/intl/en-GB/about/products?tab=mh" aria-expanded="false" role="button" tabindex="0">
                                <svg sx={styles.userContainer.userOptionsContainer.appsMenuContainer.appsMenuButton.appsMenuIcon} focusable="false" viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div sx={styles.userContainer.userOptionsContainer.appsMenuContainer.userIdContainer} role="button" tabindex="0" aria-expanded="false">
                    <div class="gb_ja">
                        <div class="gb_la">
                            {/* <p aria-label={(i18nextHeader.t('Header.TOPBAR.welcomeInfo'))}><UserOptionsList label={(i18nextHeader.t('Header.TOPBAR.welcomeInfo'))}><span>{ i18nextHeader.t('Header.TOPBAR.welcome', { username: userAuthenticated.name }) }<BiCaretDown/></span></UserOptionsList></p> */}
                        </div>
                    </div>
                    <div class="gb_Ma gb_gd gb_lg gb_f gb_zb gb_zf">
                        <div class="gb_yf gb_Wa gb_lg gb_f">
                            <a class="gb_A gb_La gb_f" aria-label="Google Account: João Almeida  (joao.almeida@fidizzi.com)">
                                <div sx={styles.userContainer.userImage}>
                                    <Image src={src} alt="User" />
                                </div>
                            </a>
                            <div class="gb_4a">
                            </div>
                            <div class="gb_3a">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div style="overflow: hidden; position: absolute; top: 0px; width: 328px; z-index: 991; height: 0px; margin-top: 57px; transition: height 0.3s ease-in-out 0s; right: 0px; margin-right: 4px; max-height: calc(-65px + 100vh); visibility: hidden;">
                <iframe role="presentation" frameborder="0" scrolling="no" name="app" src="https://ogs.google.com/u/2/widget/app?origin=https%3A%2F%2Fmail.google.com&amp;cn=app&amp;pid=23&amp;spid=23&amp;hl=en-GB" style="height: 100%; width: 100%; visibility: hidden;"></iframe>
            </div>
            <div style="overflow: hidden; position: absolute; top: 0px; width: 372px; z-index: 991; height: 0px; margin-top: 57px; right: 0px; margin-right: 4px; max-height: calc(-65px + 100vh); max-width: calc(-24px + 100vw); visibility: hidden;">
                <iframe role="presentation" frameborder="0" scrolling="no" name="account" src="https://ogs.google.com/u/2/widget/account?origin=https%3A%2F%2Fmail.google.com&amp;cn=account&amp;pid=23&amp;spid=23&amp;hl=en-GB" style="height: 100%; width: 100%; visibility: hidden;"></iframe>
            </div> */}
        </div>
        );
    }

    const renderLinkContent = () => {
        if (userAuthenticated && userAuthenticated.username) {
            return (
                <p aria-label={(i18nextHeader.t('Header.TOPBAR.welcomeInfo'))}><UserOptionsList label={(i18nextHeader.t('Header.TOPBAR.welcomeInfo'))}><span>{ i18nextHeader.t('Header.TOPBAR.welcome', { username: userAuthenticated.name }) }<BiCaretDown/></span></UserOptionsList></p>
            );
        }
        else {
            return (
                <Link
                    path={process.env.NEXT_PUBLIC_HOME_BASE_URL + "/admin/auth/login/cover"}
                    aria-label={ i18nextHeader.t('Header.TOPBAR.loginLinkInfo') }
                    style={{color: 'inherit', cursor: 'pointer', textDecoration: 'none', padding: 0, display: 'inline-block'}}
                    >
                    {/* <span style={{fontSize: "inherit"}}>{ i18nextHeader.t('Header.TOPBAR.login') }</span> */}
                    <Button style={{maxHeight: '100%', padding: '13px 30px', borderRadius: '.25rem', borderTopLeftRadius: '0.25rem', borderTopRightRadius: '0.25rem', borderBottomRightRadius: '0.25rem', borderBottomLeftRadius: '0.25rem'}}>
                        <span style={{fontSize: "inherit"}}>{ i18nextHeader.t('Header.TOPBAR.enter') }</span>
                    </Button>
                </Link>
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
                        <Link
                            path={process.env.NEXT_PUBLIC_HOME_BASE_URL + "/admin/auth/login/cover"}
                            aria-label={ i18nextHeader.t('Header.TOPBAR.enterLinkInfo') }
                            style={{color: 'inherit', cursor: 'pointer', textDecoration: 'none', padding: 0, display: 'inline-block'}}
                            >
                            {/* <div sx={styles.userContainer.userImage}>
                                    <Image src={src} alt="User" />
                            </div> */}
                            <Button style={{maxHeight: '100%', padding: '13px 30px', borderRadius: '.25rem', borderTopLeftRadius: '0.25rem', borderTopRightRadius: '0.25rem', borderBottomRightRadius: '0.25rem', borderBottomLeftRadius: '0.25rem'}}>
                                <span style={{fontSize: "inherit"}}>{ i18nextHeader.t('Header.TOPBAR.enter') }</span>
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    const renderInnerBlock = () => {
        return (
            <div sx={styles.userContainer}>
                <div sx={innerContain}>
                    {/* <Link
                        path={process.env.NEXT_PUBLIC_HOME_BASE_URL + "/admin/auth/login/cover"}
                        aria-label={ i18nextHeader.t('Header.TOPBAR.enterLinkInfo') }
                        style={{color: 'inherit', cursor: 'pointer', textDecoration: 'none', padding: 0, display: 'inline-block'}}
                        >
                        <Button>
                            <span style={{fontSize: "inherit"}}>{ i18nextHeader.t('Header.TOPBAR.enter') }</span>
                        </Button>
                    </Link> */}
                    {/* <div sx={styles.userContainer.userInlineImage}>
                        <Image src={src} alt="User" />
                    </div> */}
                    {renderLinkContent()}
                </div>
            </div>
        );
    }

    return (
        renderUserOptions()
        // className === 'inlineBlock'
        // ? renderInnerBlock()
        // : renderBlock()
    );
}