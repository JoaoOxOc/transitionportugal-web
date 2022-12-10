import { keyframes } from '@emotion/react';

import { COLORS as colors } from '../../theme/parameters';

const positionAnim = keyframes`
  from {
    position: fixed;
    opacity: 1;
  }
  to {
    position: absolute;
    opacity: 1;
    transition: all 0.4s ease;
  }
`;

export const headerStyles = {
    header: {
      color: 'black',
      fontWeight: 'normal',
      py: 4,
      width: '100%',
      position: 'absolute',
      //top: '32px',//change for topbar height
      left: 0,
      background: 'rgba(255, 255, 255, 0.6)',
      // backgroundColor: 'transparent',
      transition: 'all 0.5s ease',
      animation: `${positionAnim} 0.4s ease`,
      '.donate__btn': {
        flexShrink: 0,
        mr: [15, 20, null, null, 0],
        ml: ['auto', null, null, null, 0],
      },
      '&.sticky': {
        position: 'fixed',
        //backgroundColor: 'background',
        color: '#000000',
        //boxShadow: '1px 3px 3px rgba(0, 0, 0, 0.6)',
        background: 'rgba(255, 255, 255, 0.92)',
        boxShadow: '1px 4px 3px rgb(0 0 0 / 0.3)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        py: 3,
        'nav > a': {
          color: 'text',
        },
        '.donate__btn': {
          borderColor: 'primary',
          color: 'primary',
          '&:hover': {
            boxShadow: 'rgba(31, 62, 118, 0.57) 0px 9px 20px -5px',
            backgroundColor: 'primary',
            color: 'white',
          },
        },
        bottomLine: {
          boxShadow: '5px 10px #888888'
        },
      },
      '.profile__menu': {
        flexShrink: 0,
        mr: [15, 20, null, null, 0],
        ml: ['auto', null, null, null, 0],
      },
      select: {
        "& option": {
          backgroundColor:  'white',
          color: 'black',
        }
      },
    },
    displayMobile: {
      '@media screen and (min-width: 1024px)': {
        display: 'none',
      },
    },
    displayBig: {
      '@media screen and (max-width: 1024px)': {
        display: 'none',
      },
    },
    topLineSticky: {
      //position: 'absolute',
      width: '80%',
      margin: '-16px auto auto auto',
      paddingTop: '12px',
      borderTop: "3px solid " + colors.nav_border_top,
    },
    topLine: {
      //position: 'absolute',
      width: '80%',
      margin: '-11px auto auto auto',
      paddingTop: '12px',
      borderTop: "3px solid " + colors.nav_border_top,
    },
    bottomLineSticky: {
      position: 'absolute',
      width: '100%',
      paddingBottom: '15px',
      borderBottom: "1px solid " + colors.nav_border_bottom,
    },
    bottomLine: {
      position: 'absolute',
      width: '100%',
      paddingBottom: '19px',
      borderBottom: "1px solid " + colors.nav_border_bottom,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    stickyLogo: {
      img: {
        height: '40px !important',
        transition: '1.25s',
      }
    },
    stickyBanner: {
      img: {
        height: '20px !important',
        transition: '1.25s',
      }
    },
    nav: {
      mx: 'auto',
      display: 'none',
      '@media screen and (min-width: 1024px)': {
        display: 'block',
      },
      div: {
          display: 'block',
      }
    },
  };