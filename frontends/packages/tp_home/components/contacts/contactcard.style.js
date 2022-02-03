import { COLORS as colors } from '../../theme/parameters';

export const ContactcardStyles = {
    contactcard: {
        width: '100%'
    },
    contactCardInner: {
        margin: '0 auto',
        padding: '10px',
        // height: '120px',
        position: 'relative',
        // background: 'rgba(255, 255, 255, 0.7)',
        // borderRadius: '16px',
        // boxShadow: '0 4px 30px rgb(0 0 0 / 10%)',
        // backdropFilter: 'blur(5px)',
        // border: '1px solid rgba(90, 173, 181, 0.3)',
        p: {
            padding: '5px',
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
        },
        span: {
        }
    },
    contactTitle: {
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: 1.5,
        svg: {
            marginTop: '-4px'
        }
    },
    contactDetail: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.5,
        paddingLeft: '15px'
    }
}