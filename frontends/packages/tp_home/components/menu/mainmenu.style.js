import {colors as HeaderColors } from '../header/header.style';

export const MainMenuStyles = {
    mainMenuContainer: {
        a: {
            fontSize: '16px',
            fontWeight: '600',
            px: 25,
            cursor: 'pointer',
            lineHeight: '1.2',
            '&.active': {
              color: HeaderColors.nav_hover,
              span: {
                '&::before': {
                  opacity: '1',
                  bottom: '-1px',
                  backgroundColor: HeaderColors.nav_hover,
                },
              }
            },
            '&:hover': {
              color: HeaderColors.nav_hover + ' !important',
              span: {
                '&::before': {
                  opacity: '1',
                  bottom: '-1px',
                  backgroundColor: HeaderColors.nav_hover,
                },
              }
            },
            span: {
              position: 'relative',
              svg: {
                marginTop: '-5px'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: '-5px',
                opacity: '0',
                width: '100%',
                height: '1px',
                backgroundColor: 'black',
                transition: '.25s',
              },
            }
        },
    },
    displayGrid: {
        display: 'grid',
        paddingLeft: '10px'
    },
    displayBlock: {
        display: 'block'
    }
}