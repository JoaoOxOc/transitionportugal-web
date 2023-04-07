import { COLORS as colors } from '../../theme/parameters';

export const SubMenuStyles = {
    subMenuSection: {
        position: 'relative',
        paddingTop: '30px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
        '&::before': {
            content: '""',
            backgroundColor: colors.sidemenu_section_separator_dot_color,
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
        },
        link: {
            fontSize: ['14px', null, 1],
            color: 'text',
            fontWeight: 'body',
            mb: 2,
            cursor: 'pointer',
            transition: 'all 0.35s',
            display: 'block',
            textDecoration: 'none',
            lineHeight: [1.5, null, null, 1.6, 1.8],
            ':hover': {
              color: 'primary',
            }
        },
    },
    displayGrid: {
        display: 'grid',
        paddingLeft: '10px'
    },
    displayBlock: {
        display: 'block'
    },
    bottomLink: {
        fontSize: [1, '15px'],
        color: 'text',
        fontWeight: '400',
        mb: 2,
        cursor: 'pointer',
        transition: 'all 0.35s',
        display: 'block',
        textDecoration: 'none',
        lineHeight: [1.5, null, 1.8],
        paddingLeft: '25px',
        paddingRight: '25px',
        ':hover': {
          color: '#0F5137',
          transition: 'all 0.35s',
          span: {
            '&::before': {
              opacity: '1',
              bottom: '-1px',
              // backgroundColor: colors.nav_hover,
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
}