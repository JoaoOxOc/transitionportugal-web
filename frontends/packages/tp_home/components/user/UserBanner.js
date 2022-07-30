/** @jsxImportSource theme-ui */
import { Image } from 'theme-ui';
import { useEffect, useState, useCallback } from "react";
import { Link } from '../generic/link';
import { i18nextHeader } from "@transitionpt/translations";

// import styles
import {UserBannerStyles as styles } from './UserBanner.style';

//import images and icons
import {BiCaretDown} from 'react-icons/bi';

export default function UserBanner({ src, className, ...rest }) {
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
                console.log("fetchSession", result, resultErrorBody);
            }
            else {
                const bodyResponse = await result.json();
                console.log("fetchSession", result, bodyResponse);
            }
        }
        catch (e) {
            console.log("fetchSessionError ",e);
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
        fetchCurrentUserSession();
    });

    const renderBlock = () => {
        return (
            <div sx={styles.userContainer}>
                <div sx={innerContain}>
                        <div sx={styles.userContainer.userImage}>
                            <Image src={src} alt="User" />
                        </div>
                        <div>
                            <p aria-label='username welcome'>{ i18nextHeader.t('Header.TOPBAR.welcome', { username: 'Joao' }) }<BiCaretDown/></p>
                        </div>
                </div>
            </div>
        );
    }

    const renderInnerBlock = () => {
        return (
            <div sx={styles.userContainer}>
                <div sx={innerContain}>
                    <p aria-label='username welcome'>{ i18nextHeader.t('Header.TOPBAR.welcome', { username: 'Joao' }) }<BiCaretDown/></p> 
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