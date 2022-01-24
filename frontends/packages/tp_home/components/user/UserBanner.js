/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Image } from 'theme-ui';
import React, { useEffect, useState } from "react";
import { Link } from '../generic/link';
import { i18nextHeader } from "@transitionpt/translations";

// import styles
import {UserBannerStyles as styles } from './UserBanner.style';

//import images and icons
import {BiCaretDown} from 'react-icons/bi';

export default function UserBanner({ src, className, ...rest }) {
    console.log(className)
    const innerContain = className === 'inlineBlock' ? styles.userContainer.userInlineBlock : styles.userContainer.userBlock;

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

    const renderBlock = () => {
        return (
            <div sx={styles.userContainer}>
                <div sx={innerContain}>
                        <div sx={styles.userContainer.userImage}>
                            <Image src={src} alt="User" />
                        </div>
                        <div>
                            <p>{ i18nextHeader.t('Header.TOPBAR.welcome', { username: 'Joao' }) }<BiCaretDown/></p>
                        </div>
                </div>
            </div>
        );
    }

    const renderInnerBlock = () => {
        return (
            <div sx={styles.userContainer}>
                <div sx={innerContain}>
                    <p>{ i18nextHeader.t('Header.TOPBAR.welcome', { username: 'Joao' }) }<BiCaretDown/></p> 
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