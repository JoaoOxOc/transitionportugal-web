/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Image } from 'theme-ui';
import React from "react";

import { Link } from '../../components/generic/link';

// import styles
import {LinkBarStyles as styles } from './linkbar.style';

//import social icons
// import {FaTwitterSquare} from 'react-icons/fa';
// import {FaFacebookSquare} from 'react-icons/fa';
// import {FaInstagram} from 'react-icons/fa';
// import {FaYoutubeSquare} from 'react-icons/fa';
// import {AiFillSlackSquare} from 'react-icons/ai';
import FacebookLogo from '../../public/social/facebook_logo.svg';
import InstagramLogo from '../../public/social/instagram_logo.svg';
import TwitterLogo from '../../public/social/twitter_logo.svg';
import YoutubeLogo from '../../public/social/youtube_logo.svg';
import SlackLogo from '../../public/social/slack_logo.svg';

import useSocialData from '../../hooks/useSocialData';

export default function LinkBar({ className, dataJson, ...rest }) {
    const {data,loading,error} = useSocialData('https://localhost:4000');
    console.log(data)

    const buildSocialLink = (jsonItem) => {
        
        const icon = <></>;
        if (jsonItem.code === 'facebook') {
            icon = <Image src={FacebookLogo} alt={jsonItem.name} />
        }
        else if (jsonItem.code === 'twitter') {
            icon = <Image src={TwitterLogo} alt={jsonItem.name} />
        }
        else if (jsonItem.code === 'instagram') {
            icon = <Image src={InstagramLogo} alt={jsonItem.name} />
        }
        else if (jsonItem.code === 'youtube') {
            icon = <Image src={YoutubeLogo} alt={jsonItem.name} />
        }
        else if (jsonItem.code === 'slack') {
            icon = <Image src={SlackLogo} alt={jsonItem.name} />
        }
        return (
            <Link
                key={jsonItem.code}
                path={jsonItem.url}
                sx={styles.socialLink}
                {...rest}
            >
                <span>{icon}</span>
            </Link>
        )
    }

    return(
        <>
        {data && 
            <div sx={styles.inlineContainer}>
                {data.map(item => buildSocialLink(item))}
            </div>
        }
        </>
    );
}