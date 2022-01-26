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
      marginRight: theme.spacing(2)
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
      '&::before': {
        position: 'absolute',
        content: '""',
        width: '320px',
        height: '130px',
        //background: 'inherit',
        left: '-272px',
        right: 0,
        top: 0,
        bottom: 0,
        boxShadow: 'inset 0 0 0 3000px rgba(90, 173, 181, 0.192)',
        filter: 'blur(10px)',
        borderRadius: '15px',
      }
    },
    sidemenuContent: {
      position: 'relative',
      width: '100%',
      paddingBottom: '20px'
    },
    sidemenuSection: {
      position: 'relative',
      paddingTop: '10px',
      paddingBottom: '10px',
      '&::before': {
          content: '""',
          backgroundColor: '#5AADB5',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          left: '10px',
          bottom: 0,
          zIndex: 1,
          position: 'absolute'
      },
      '&::after': {
          content: '""',
          width: '180px',
          height: '1px',
          bottom: '2px',
          left: '10px',
          position: 'absolute',
          background: 'linear-gradient(to right,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
          background: '-ms-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
          background: '-o-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
          background: '-webkit-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
          background: '-moz-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
          background: '-webkit-gradient(linear,left top,right top,color-stop(0%,#e0e0e0),color-stop(35%,#e0e0e0),color-stop(65%,#e0e0e0),color-stop(100%,#fff))'
      }
    },
    sidemenuUserWrapper: {
        height: '80px',
        width: '320px',
        background: 'inherit',
        borderRadius: '15px',
        //border: '1px solid rgba(43, 43, 43, 0.568)',
        position: 'absolute',
        '&::before': {
          position: 'absolute',
          content: '""',
          background: 'inherit',
          left: 0,
          right: 0,
          //top: 0,
          bottom: 0,
          boxShadow: 'inset 0 0 0 3000px rgba(90, 173, 181, 0.192)',
          filter: 'blur(10px)',
          borderRadius: '15px'
        }
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
      //borderTop: '1px solid #ccc'
    }
  }));