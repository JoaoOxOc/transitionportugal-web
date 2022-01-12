import { keyframes } from '@emotion/react';

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
      color: 'white',
      fontWeight: 'normal',
      py: 4,
      width: '100%',
      position: 'absolute',
      top: '32px',//change for topbar height
      left: 0,
      backgroundColor: 'transparent',
      transition: 'all 0.5s ease',
      animation: `${positionAnim} 0.4s ease`,
      '.donate__btn': {
        flexShrink: 0,
        mr: [15, 20, null, null, 0],
        ml: ['auto', null, null, null, 0],
      },
      '&.sticky': {
        position: 'fixed',
        backgroundColor: 'background',
        color: '#000000',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
        py: 3,
        'nev > a': {
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
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    nav: {
      mx: 'auto',
      display: 'none',
      '@media screen and (min-width: 1024px)': {
        display: 'block',
      },
      a: {
        fontSize: '16px',
        fontWeight: '400',
        px: 25,
        cursor: 'pointer',
        lineHeight: '1.2',
        '&.active': {
          color: 'secondary',
        },
      },
      div: {
          display: 'block',
      },
    },
  };