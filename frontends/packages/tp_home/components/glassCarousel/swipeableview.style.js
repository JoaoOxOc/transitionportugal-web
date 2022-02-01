import makeStyles from '@mui/styles/makeStyles';

import { COLORS as colors } from '../../theme/parameters';

export const SwipeableViewStyles = {
    SwipeableSteppers: {
        background: 'transparent !important',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        '.MuiMobileStepper-dots': {
            margin: '0 auto',
            bottom: 0,
        },
        '.MuiMobileStepper-dot': {
            height: '14px',
            width: '14px'
        }
    },
    SwipeableTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: colors.text
    },
    SwipeableText: {
        paddingLeft: '20px',
        width: '100%',
        fontSize: '18px',
        //color: colors.text
    },
    carouselBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexShrink: 0,
        padding: '10px',
        // pt: [0, null, null, null, null, null, 5, 7],
        p: {
            paddingRight: 0
        }
    },
};