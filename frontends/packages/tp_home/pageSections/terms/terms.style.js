import { COLORS as colors } from '../../theme/parameters';

export const TermsPageSectionStyles = {
    termsSectionContainer: {
        position: 'relative',
        paddingTop: '20px',
        paddingBottom: "20px",
        '&::before': {
            content: '""',
            backgroundColor: colors.sidemenu_section_separator_dot_color,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            left: '-20px',
            top: 0,
            zIndex: 1,
            position: 'absolute'
        },
        '&::after': {
            content: '""',
            width: '70vw',
            height: '2px',
            left: '-20px',
            top: '4px',
            position: 'absolute',
            background: 'linear-gradient(to right,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-ms-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-o-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-webkit-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-moz-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-webkit-gradient(linear,left top,right top,color-stop(0%,#e0e0e0),color-stop(35%,#e0e0e0),color-stop(65%,#e0e0e0),color-stop(100%,#fff))'
        }
    },
    sectionCard: {
        width: ['100%'],
        margin: '0 auto',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgb(0 0 0 / 10%)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(90, 173, 181, 0.3)',
        padding: '20px',
    },
}