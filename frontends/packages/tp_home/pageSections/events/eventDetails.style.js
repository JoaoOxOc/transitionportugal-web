import { COLORS as colors } from '../../theme/parameters';

export const EventDetailsStyles = {
    eventDetailsSectionContainer: {
        pt: "50px",
        pb: "50px",
    },
    parsedSectionContainer: {
        position: 'relative',
        paddingTop: '20px',
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
    eventInfoGrid: {
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        display: 'grid',
        gap: ['10px','10px','10px','60px','60px','60px'],
        gridTemplateColumns: ['repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)','repeat(3,1fr)','repeat(3,1fr)','repeat(3,1fr)'],
        fontSize: '16px',
        fontWeight: '600',
        px: 25
    },
    eventDateRangeItem: {
        display: 'flex',
        'grid-column-start': '3',
        'grid-column-end': 'span 2'
    },
    eventInfoIcon: {
        marginTop: '-2px'
    }
};