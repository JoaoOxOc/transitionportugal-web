import React, { useEffect, useState, useRef } from "react";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { Link } from '../generic/link';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { i18nextHeader } from "@transitionpt/translations";
import {FcHome} from 'react-icons/fc';
import {FcSportsMode} from 'react-icons/fc';

export default function UserOptionsList({label, children}) {
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

    const buildMenuItem = (path, label, ariaLabel, icon, index) => {
        return (
            <Link
                path={path}
                key={index}
                aria-label={ i18nextHeader.t(label) }
                style={{padding: '0px', width: '100%', color: 'inherit', textDecoration: 'none', display: 'inline-block'}}
                >
                    <MenuItem aria-label={i18nextHeader.t(ariaLabel)} tabIndex={0} onClick={handleClose}><span style={{fontSize: "14px", padding: '8px 0px 8px 0px'}}>{icon} { i18nextHeader.t(label) }</span></MenuItem>
                
            </Link>
        )
    }

    return (
    <>
        <a
            ref={anchorRef}
            id={"useroptions-button"}
            style={{padding: '10px', padding: 0, color: 'inherit', cursor: 'pointer', textDecoration: 'none', display: 'inline-block'}}
            aria-controls={open ? "useroptions-menulist" : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            aria-label={ label }
            onClick={handleToggle}
        >
            <span>{ children }</span>
        </a>
        <Popper
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
                    id={"useroptions-menulist"}
                    aria-labelledby={i18nextHeader.t(label)}
                    onKeyDown={handleListKeyDown}
                >
                    {buildMenuItem("/admin/profile/user", 'Header.TOPBAR.userProfile', 'Header.TOPBAR.userProfileInfo', <FcHome/>, 0)}
                    {buildMenuItem("/admin/api/auth/signout", 'Header.TOPBAR.userLogout', 'Header.TOPBAR.userLogoutInfo', <FcSportsMode/>, 1)}
                </MenuList>
                </ClickAwayListener>
            </Paper>
            </Grow>
        )}
        </Popper>
    </>
    );
}

