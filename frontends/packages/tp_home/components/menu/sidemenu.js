import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { SidemenuStyles as useStyles} from './sidemenu.style';

import Language from '../../components/language/language';
import UserBanner from '../user/UserBanner';
import MainMenu from './mainmenu';
import SubMenu from './submenu';
import SocialLinkBar from '../social/linkbar';

//import images and icons
import UserLogoDark from '../../public/user_icon.svg';

function ResponsiveDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [windowSize, setWindowSizeVar] = useState(0);

    useEffect(() => {
        setWindowSizeVar(window.innerWidth);
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 1024 && windowSize > 1024) {
                setWindowSizeVar(window.innerWidth);
            }
            else if (window.innerWidth >= 1024 && windowSize < 1024) {
              setWindowSizeVar(window.innerWidth);
            }
        });
    }, [windowSize]);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    function handleSidemenuOpen() {
        
    }

    const actualSidemenuContent = (
        <div>
            <SimpleBar autoHide={true}>
                <div className={classes.sidemenuContent}>
                    <div className={classes.sidemenuUserWrapper}></div>
                    <UserBanner src={UserLogoDark} className={ 'sidemenu' }/>
                    { windowSize < 1024 &&
                        <div className={classes.sidemenuSection}>
                            <MainMenu displayType={'displayGrid'}/>
                            <div className={classes.sidemenuLanguage}>
                                <Language/>
                            </div>
                        </div>
                    }
                    <SubMenu displayType={'displayGrid'}/>
                </div>
                <div className={classes.sidemenuFooter}>
                    <div className={classes.sidemenuFooterContainer}>
                        <SocialLinkBar/>
                    </div>
                </div>
            </SimpleBar>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                <MenuIcon />
            </IconButton>
        
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            {/* <Hidden smUp implementation="css"> */}
            <SwipeableDrawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'left' : 'right'}
                    open={mobileOpen}
                    onOpen={handleSidemenuOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                >
                <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                    <CloseIcon/>
                </IconButton>
                {actualSidemenuContent}
            </SwipeableDrawer>
            {/* </Hidden> */}
        </div>
    );
}

export default ResponsiveDrawer;