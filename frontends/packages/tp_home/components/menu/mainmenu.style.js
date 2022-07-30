import { COLORS as colors } from '../../theme/parameters';

export const MainMenuStyles = {
    mainMenuContainer: {
        a: {
            fontSize: '16px',
            fontWeight: '600',
            px: 25,
            cursor: 'pointer',
            lineHeight: '1.2',
            transition: 'all 0.35s',
            '&.active': {
              color: colors.nav_hover + ' !important',
              textDecoration: 'none',
              span: {
                '&::before': {
                  opacity: '1',
                  bottom: '-1px',
                  backgroundColor: colors.nav_hover,
                },
              }
            },
            '&:hover, &:focus': {
              color: colors.nav_hover + ' !important',
              span: {
                '&::before': {
                  opacity: '1',
                  bottom: '-1px',
                  backgroundColor: colors.nav_hover,
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
                backgroundColor: colors.nav_menu_underline_bg_color,
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