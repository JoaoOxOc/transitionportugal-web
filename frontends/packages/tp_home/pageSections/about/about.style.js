export const AboutStyles = {
    about: {
        width: '100%',
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
        paddingTop: ['106px','106px','106px','106px','106px','196px'],
        margin: '0 auto',
        paddingBottom: ['0','0','0','0','0','80px'],
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
        gridTemplateColumns: ['repeat(1,1fr)','repeat(1,1fr)','repeat(1,1fr)','repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)']
    },
    aboutTopicsGrid: {
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        display: 'grid',
        gap: '60px',
        gridTemplateColumns: ['repeat(1,1fr)','repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)']
    },
    aboutGridColumn: {
        display: ['block','block','block','block','flex'],
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        maxWidth: ['230px','230px','230px','230px','none'],
        textAlign: ['center','center','center','center','left'],
        margin: '0 auto',
        figure: {
            backgroundColor: 'white',
            boxShadow: '0px 8px 24px rgb(53 95 158 / 30%)',
            height: '90px',
            width: '90px',
            minWidth: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            margin: ['0 auto 30px','0 auto 30px','0 auto 30px','0 auto 30px','0 26px 0 0'],
            img: {
                maxWidth: '50px'
            }
        }
    },
    aboutCarousel: {
        container: {
            display: 'flex',
        },
        contentBox: {
            width: ['100%', '100%', '100%', '100%', '100%', '100%'],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flexShrink: 0,
            // pt: [0, null, null, null, null, null, 5, 7],
            color: '#5AADB5',
        },
    },
    aboutGridImageBox: {
        paddingTop: ['0','0','0','0','0','96px'],
        paddingBottom: '40px'
    },
    aboutGridColumnText: {
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        h3: {
            fontSize: '18px',
            lineHeight: 1.28,
            color: '#0F2137',
            marginBottom: '20px',
            fontFamily: 'DM Sans',
            fontWeight: 500
        },
        p: {
            fontSize: '16px',
            lineHeight: [1.6,1.6,1.6,1.88],
            color: '#343D48'
        }
    },
    aboutCenterBox: {
        display: ['flex'],
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        padding: '60px',
        maxWidth: ['100%'],
        textAlign: ['center','center','center','center','left'],
        aboutCenterContent: {
            margin: '0 auto',
        },
        div: {
            margin: '0 auto'
        }
    },
    aboutBigBanner: {
        width: '100%',
        padding: '20px',
        marginTop: '40px',
        backgroundColor: '#44883E'
    },
    aboutBigBannerContainer: {
        textAlign: 'left',
        paddingTop: ['50px','50px','50px','100px'],
        paddingBottom: ['50px','50px','50px','100px'],
        paddingLeft: ['5px','5px','50px','100px','200px','200px','200px','500px'],
        paddingRight: ['5px','5px','50px','100px','200px','200px','200px','500px']
    },
    aboutBigBannerMessage: {
        color: '#FFFFFF',
        fontFamily: '"Open Sans", Sans-serif',
        fontSize: ['24px','24px','24px','33px'],
        fontStyle: 'italic',
        fontWeight: 300,
        lineHeight: '1.4em',
        marginBottom: '20px',
    },
    aboutBigBannerAuthor: {
        display: 'block',
        color: '#FFFFFF',
        fontFamily: '"Lora", Sans-serif',
        fontSize: '25px',
        fontWeight: 'normal',
        lineHeight: '1.4em',

    },
    aboutBigBannerAuthorInfo: {
        display: 'block',
        color: '#FFFFFF',
        fontFamily: '"Open Sans", Sans-serif',
        fontSize: '12px',
        fontWeight: 300,
        textTransform: 'uppercase',
        lineHeight: '2em',
        letterSpacing: '3px'
    },
    aboutBigBannerInlineContent: {
        display: 'inline-block',
        boxSizing: 'border-box',
        textAlign: 'left'
    },
    aboutBigBannerInlineImage: {
        display: 'table-cell',
        verticalAlign: 'middle',
        paddingRight: '15px',
        img: {
            width: '55px',
            height: '55px',
            objectFit: 'cover',
            borderRadius: '50%',
        },
        p: {
            marginBottom: '0 !important'
        }
    },
    aboutBigBannerInlineDetails: {
        display: 'table-cell',
        verticalAlign: 'middle',
        h3: {
        },
        p: {
            marginBottom: '0 !important'
        }
    }
}