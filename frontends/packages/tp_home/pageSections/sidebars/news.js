/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import React from 'react';

import { NewsStyles as styles } from './news.style';

import { IoNewspaperOutline } from 'react-icons/io5';

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
        <div sx={classes.newsToggle}>
            <div sx={classes.newsToggleContainer}><IoNewspaperOutline/></div>
        </div>
    );
}