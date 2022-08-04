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

    const buildMenuItem = (path, label, icon, index) => {
        return (
            <Link
                path={path}
                key={index}
                aria-label={ i18nextHeader.t(label) }
                style={{padding: '10px', color: 'inherit', textDecoration: 'none', display: 'inline-block'}}
                >
                <span style={{fontSize: "14px"}}>{icon} { i18nextHeader.t(label) }</span>
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
                    <MenuItem aria-label={i18nextHeader.t('Header.TOPBAR.userProfileInfo')} tabindex="0" onClick={handleClose}>{buildMenuItem(process.env.NEXT_PUBLIC_HOME_BASE_URL + "/admin/profile/user", 'Header.TOPBAR.userProfile', <FcHome/>, 0)}</MenuItem>
                    <MenuItem aria-label={i18nextHeader.t('Header.TOPBAR.userLogoutInfo')} tabindex="1" onClick={handleClose}>{buildMenuItem(process.env.NEXT_PUBLIC_HOME_BASE_URL + "/admin/api/auth/signout", 'Header.TOPBAR.userLogout', <FcSportsMode/>, 0)}</MenuItem>
                </MenuList>
                </ClickAwayListener>
            </Paper>
            </Grow>
        )}
        </Popper>
    </>
    );
}

