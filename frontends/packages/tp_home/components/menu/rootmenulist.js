import React, { useEffect, useState, useRef } from "react";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { i18nextHeader } from "@transitionpt/translations";

export default function RootMenuList({baseTabIndex, path, label, ariaLabel, type, display, icon, index, submenuOptions, renderScrollLink, renderPageLink, incrementBaseTabIndex, isMobile}) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus();
        }
    
        prevOpen.current = open;
    }, [open]);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
    };
    
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        } else if (event.key === 'Escape') {
          setOpen(false);
        }
    }

    const buildMenuItem = (path, label, ariaLabel, type, display, icon, index, isMenuItem) => {
        if (index === submenuOptions.length -1) {
            incrementBaseTabIndex(baseTabIndex+index);
        }
        return (
            type === 'page' ? (
                renderPageLink(path, label, ariaLabel, icon, index, baseTabIndex, true, !isMenuItem, handleClose)
            ) : (renderScrollLink(path, label, ariaLabel, type, display, icon, index, baseTabIndex, true, !isMenuItem, handleClose))
        )
    }

    return (
    <>
        { !isMobile ? (
            <>
                <a
                    ref={anchorRef}
                    key={index}
                    tabIndex={baseTabIndex-1}
                    id={"rootmenu-" + path + "-button"}
                    style={{padding: '10px', color: 'inherit', textDecoration: 'none', display: 'inline-block'}}
                    aria-controls={open ? path + "-menulist" : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    aria-label={ i18nextHeader.t(ariaLabel) }
                    onClick={handleToggle}
                >
                    <span>{icon} { i18nextHeader.t(label) }</span>
                </a>
                <Popper
                    key={'Popper' + index}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                    style={{zIndex: '1'}}
                >
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                            // autoFocusItem={open}
                            id={path + "-menulist"}
                            aria-labelledby={i18nextHeader.t(ariaLabel)}
                            onKeyDown={handleListKeyDown}
                        >
                            {submenuOptions.map(({ path, label, ariaLabel, type, display, icon }, i) => (
                                buildMenuItem(path, label, ariaLabel, type, display, icon, i, true)
                            ))}
                            {/* <MenuItem onClick={handleClose}><span>{icon} Profile</span></MenuItem> */}
                            {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
            </>
        ) : (
            <>
                <a
                    key={index}
                    tabIndex={baseTabIndex-1}
                    id={"rootmenu-" + path + "-button"}
                    style={{padding: '10px', color: 'inherit', textDecoration: 'none', display: 'inline-block'}}
                    aria-label={ i18nextHeader.t(label) }
                >
                    <span>{icon} { i18nextHeader.t(label) }</span>
                </a>
                <div
                    key={'submenuOptions'+index} style={{padding: '10px', color: 'inherit', textDecoration: 'none', display: 'inline-block'}}
                >
                    {submenuOptions.map(({ path, label, ariaLabel, type, display, icon }, i) => (
                        <>{buildMenuItem(path, label, ariaLabel, type, display, icon, i, false)}</>
                    ))}
                </div>
            </>
            )
        }
    </>);
}

