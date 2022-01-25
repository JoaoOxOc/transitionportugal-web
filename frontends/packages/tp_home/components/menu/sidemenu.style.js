import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 320;

export const SidemenuStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      // [theme.breakpoints.up('sm')]: {
      //   display: 'none',
      // },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    closeMenuButton: {
      marginRight: 0,
      marginLeft: 'auto',
    },
    sidemenuContent: {
      position: 'relative',
      width: '100%',
      paddingBottom: '20px'
    },
    sidemenuFooter: {
      position: 'relative',
      right: 0,
      bottom: 0,
      width: '100%'
    },
    sidemenuFooterContainer: {
      position: 'relative',
      width: '100%',
      paddingLeft: '10px',
      paddingTop: '10px',
      bottom: '10px',
      borderTop: '1px solid #ccc'
    }
  }));