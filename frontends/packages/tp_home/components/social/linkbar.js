/** @jsxImportSource theme-ui */
import { Image } from 'theme-ui';
import React from "react";

import { TraditionalLink } from '../../components/generic/link';

// import styles
import {LinkBarStyles as styles } from './linkbar.style';

//import social icons
import {FaTwitterSquare} from 'react-icons/fa';
import {FaFacebookSquare} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaYoutubeSquare} from 'react-icons/fa';
import {AiFillSlackSquare} from 'react-icons/ai';
//import FacebookLogo from '../../public/social/facebook_logo.svg';
import InstagramLogo from '../../public/social/instagram_logo.svg';
//import TwitterLogo from '../../public/social/twitter_logo.svg';
//import YoutubeLogo from '../../public/social/youtube_logo.svg';
import SlackLogo from '../../public/social/slack_logo.svg';

import useSocialData from '../../hooks/useSocialData';

const SocialLinkBar = React.memo(function SocialLinkBar({ className, dataJson, ...rest }) {
    const {data,loading,error} = useSocialData('https://localhost:4000');

    const buildSocialLink = (jsonItem) => {
        const socialIconStyle = {};
        const icon = <></>;
        if (jsonItem.code === 'facebook') {
            socialIconStyle = styles.socialLink.facebookIcon;
            icon = <FaFacebookSquare />
        }
        else if (jsonItem.code === 'twitter') {
            socialIconStyle = styles.socialLink.twitterIcon;
            icon = <FaTwitterSquare />
        }
        else if (jsonItem.code === 'instagram') {
            socialIconStyle = styles.socialLink.instagramIcon;
            icon = <Image src={InstagramLogo} alt={jsonItem.name} />
        }
        else if (jsonItem.code === 'youtube') {
            socialIconStyle = styles.socialLink.youtubeIcon;
            icon = <FaYoutubeSquare />
        }
        else if (jsonItem.code === 'slack') {
            socialIconStyle = styles.socialLink.slackIcon;
            icon = <Image src={SlackLogo} alt={jsonItem.name} />
        }
        return (
            <div key={jsonItem.code} sx={styles.socialLinkItem}>
                <TraditionalLink
                    path={jsonItem.url}
                    sx={styles.socialLink}
                    target='_blank'
                    aria-label={ jsonItem.name }
                    rel='noopener'
                    {...rest}
                >
                    <span sx={Object.assign({}, styles.socialLink.icon, socialIconStyle)}>{icon}</span>
                </TraditionalLink>
            </div>
        )
    }

    return(
        <>
        {data && 
            <div sx={styles.inlineContainer}>
                <div sx={styles.socialLinkItems}>
                    {data.map(item => buildSocialLink(item))}
                </div>
            </div>
        }
        </>
    );
});

export default SocialLinkBar;