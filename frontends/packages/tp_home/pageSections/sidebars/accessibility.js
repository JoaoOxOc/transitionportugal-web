/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from "react-pro-sidebar";

import { AccessibilityStyles as styles } from './accessibility.style';

//import sidebar css from react-pro-sidebar module
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.module.css";

import { IoAccessibilityOutline } from 'react-icons/io5';

export default function Acessibility({accessWidth, posRight, posLeft, posTop, posBottom}) {
    //create initial menuCollapse state using useState hook
    const [showAcessibility, toggleAcessibility] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
    const acessibilityIconClick = () => {
        //condition checking to change state from true to false and vice versa
        showAcessibility ? toggleAcessibility(false) : toggleAcessibility(true);
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
        <div sx={!showAcessibility ? classes.accessibilityToggle : classes.accessibilityToggled}>
            <div sx={classes.accessibilityToggleContainer} onClick={()=>toggleAcessibility(!showAcessibility)}><IoAccessibilityOutline/></div>
            <div sx={Object.assign({}, classes.accessibilityInnerContainer, (!showAcessibility ? classes.accessibilityInnerContainerHidden : classes.accessibilityInnerContainerToggled))}>
                <h3 sx={classes.AcessibilityTitle}>Acessibilidade</h3>
            </div>
        </div>
    );
}