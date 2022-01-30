import { COLORS as colors } from '../../theme/parameters';

export const SubMenuStyles = {
    subMenuSection: {
        position: 'relative',
        paddingTop: '30px',
        paddingLeft: '20px',
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
        }
    }
}