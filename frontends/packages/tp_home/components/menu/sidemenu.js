import React from 'react';
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


import UserBanner from '../user/UserBanner';
import MainMenu from './mainmenu';
import SubMenu from './submenu';
import SocialLinkBar from '../social/linkbar';

//import images and icons
import UserLogoDark from '../../public/user_icon.svg';

function ResponsiveDrawer() {
    const dummyCategories = ['Hokusai', 'Hiroshige', 'Utamaro', 'Kuniyoshi', 'Yoshitoshi']
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    const actualSidemenuContent = (
        <div>
            <SimpleBar autoHide={true}>
                <div className={classes.sidemenuContent}>
                    <UserBanner src={UserLogoDark} className={ 'sidemenu' }/>
                    <MainMenu displayType={'displayGrid'}/>
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