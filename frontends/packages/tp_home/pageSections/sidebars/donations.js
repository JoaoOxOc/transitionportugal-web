/** @jsxImportSource theme-ui */

import React, { useState } from 'react';

import DonationsList from '../../components/donations/donationslist';

import { DonationStyles as styles } from './donations.style';

import { AiFillHeart } from 'react-icons/ai';

export default function Donations({accessWidth, posRight, posLeft, posTop, posBottom}) {
    //create initial menuCollapse state using useState hook
    const [showDonations, toggleDonations] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
    const donationsIconClick = () => {
        //condition checking to change state from true to false and vice versa
        showDonations ? toggleDonations(false) : toggleDonations(true);
    };

    const styleProps = {
        width: accessWidth,
        posRight: posRight,
        posLeft: posLeft,
        posTop: posTop,
        posBottom: posBottom
    };
    const classes = styles(styleProps);

    return (
        <div sx={!showDonations ? classes.donationToggle : classes.donationToggled}>
            <div sx={classes.donationToggleContainer} onClick={()=>toggleDonations(!showDonations)}><AiFillHeart/></div>
            <div sx={Object.assign({}, classes.donationInnerContainer, (!showDonations ? classes.donationInnerContainerHidden : classes.donationInnerContainerToggled))}>
                <DonationsList/>
            </div>
        </div>
    );
}