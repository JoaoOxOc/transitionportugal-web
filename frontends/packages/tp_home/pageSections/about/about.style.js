export const AboutStyles = {
    about: {
        width: '100%',
        height: '100px'
    },
    aboutContainer: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    aboutMainHeader: {
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        textAlign: 'center',
        maxWidth: '580px',
        paddingTop: '96px',
        margin: '0 auto',
        paddingBottom: '80px',
        'h2': {
            fontFamily: 'DM Sans',
            lineHeight: 1.5,
            fontWeight: 500,
        },
        p: {
            fontSize: '16px',
            lineHeight: 2.2,
            marginTop: '10px',
            color: '#0F2137'
        }
    },
    aboutGrid: {
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        display: 'grid',
        gap: '60px',
        gridTemplateColumns: ['repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)']
    },
    aboutGridColumn: {
        display: ['block','block','block','block','flex'],
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        maxWidth: ['230px','230px','230px','230px','none'],
        textAlign: ['center','center','center','center','left'],
        margin: '0 auto'
    }
}