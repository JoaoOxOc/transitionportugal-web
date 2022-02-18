/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import React from 'react';

import { AccessibilityStyles as styles } from './accessibility.style';

import { IoAccessibilityOutline } from 'react-icons/io5';

export default function Acessibility({accessWidth, posRight, posLeft, posTop, posBottom}) {
    const styleProps = {
        width: accessWidth,
        posRight: posRight,
        posLeft: posLeft,
        posTop: posTop,
        posBottom: posBottom
    };
    const classes = styles(styleProps);

    return (
        <div sx={classes.accessibilityToggle}>
            <div sx={classes.accessibilityToggleContainer}><IoAccessibilityOutline/></div>
        </div>
    );
}