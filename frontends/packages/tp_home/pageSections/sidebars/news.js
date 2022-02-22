/** @jsxImportSource theme-ui */

import React, { useState } from 'react';
import NewsList from '../../components/news/newslist';

import { NewsStyles as styles } from './news.style';

import { IoNewspaperOutline } from 'react-icons/io5';

export default function News({accessWidth, posRight, posLeft, posTop, posBottom}) {
    const [showNews, toggleNews] = useState(false);

    const styleProps = {
        width: accessWidth,
        posRight: posRight,
        posLeft: posLeft,
        posTop: posTop,
        posBottom: posBottom
    };
    const classes = styles(styleProps);

    return (
        <div sx={!showNews ? classes.newsToggle : classes.newsToggled}>
            <div sx={classes.newsToggleContainer} onClick={()=>toggleNews(!showNews)}><IoNewspaperOutline/></div>
            <div sx={Object.assign({}, classes.newsInnerContainer, (!showNews ? classes.newsInnerContainerHidden : classes.newsInnerContainerToggled))}>
                <NewsList/>
            </div>
        </div>
    );
}