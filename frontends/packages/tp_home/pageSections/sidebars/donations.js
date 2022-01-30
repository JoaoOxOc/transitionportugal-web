/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import React from 'react';

import { DonationStyles as styles } from './donations.style';

import { AiFillHeart } from 'react-icons/ai';

export default function Donations({accessWidth, posRight, posLeft, posTop, posBottom}) {
    const styleProps = {
        width: accessWidth,
        posRight: posRight,
        posLeft: posLeft,
        posTop: posTop,
        posBottom: posBottom
    };
    const classes = styles(styleProps);

    return (
        <div sx={classes.donationToggle}>
            <div sx={classes.donationToggleContainer}><AiFillHeart/></div>
        </div>
    );
}