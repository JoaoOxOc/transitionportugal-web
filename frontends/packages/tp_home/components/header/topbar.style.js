export const topBarStyles = {
    container: {
        position: 'relative',
        backgroundColor: '#EFFAFC',
        color: '#111',
        width: '100%',
        height: '70px',
        fontSize: '0.875em',
        padding: '0.1rem 0 0.3rem 0',
        zIndex: '200',
        'button': {
          maxWidth: '200px',
          maxHeight: '26px',
          padding: '0 0.375rem 0.3rem 0.375rem'
        },
    },
    innerContainer: {
        padding: '0',
        height: '100%',
    },
    gridBox: {
        height: '100%',
        margin: 'auto',
        padding: '0.1rem'
    },
    moveNegativeLeft: {
        marginLeft: '-30px'
    },
    moveNegativeRight: {
        marginRight: '-25px'
    },
    subGrid: {
        height: '100%'
    },
    subGridBox: {
        height: '100%',
        width: '100%',
        margin: 'auto'
    },
    boxContainer: {
        position: 'relative',
        height: '70px',
        margin: '0 !important',
        padding: '0 !important',
        boxInnerContainer: {
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
        },
        a: {
            position: 'relative',
            width: '100%',
            justifyContent: 'center',
            marginRight: '0'
        },
        img: {
            position: 'absolute',
            maxWidth: '500px',
            maxHeight: '100%'
        }
    },
    smallboxRight: {
        float: 'right',
        height: '100%',
        maxWidth: '200px',
        alignItems: 'center',
        display: 'flex'
    },
    loginBox: {
        height: '45px'
    }
}