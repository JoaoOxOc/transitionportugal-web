import FacebookLogo from '../../public/social/facebook_logo.svg';

export const LinkBarStyles = {
    inlineContainer: {
        width: '100%',
        height: '100%',
        display: 'inline-flex',
        alignItems: 'center'
    },
    socialLinkItems: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        margin: '0 auto'
    },
    socialLinkItem: {
        display: 'flex',
        padding: '0 0.225rem'
    },
    socialLink: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        lineHeight: '1',
        height: '100%',
        padding: 0,
        textAlign: 'center',
        border: 'none !important',
        textDecoration: 'none !important',
        boxShadow: 'none !important',
        transition: 'background-color .2s',
        '&:hover': {
            span: {
                backgroundColor: '#cccccc',
            }
        },
        icon: {
            border: '1px solid #ccc',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: '.25s',
            fill: 'black',
            fontFamily: 'powerkit-icons !important',
            fontStyle: 'normal',
            fontWeight: '400',
            fontVariant: 'normal',
            textTransform: 'none',
            lineHeight: '1',
            webkitFontSmoothing: 'antialiased',
            color: 'black',
            "&::before": {
                //content: 'url("' + FacebookLogo + '")'
            },
            svg: {
                width: '20px',
                height: '20px'
            },
            img: {
                width: '20px',
                height: '20px'
            }
        },
        facebookIcon: {
            color: '#3b5998',
            '&:hover': {
                color: '#3b5998',
                svg: {
                    color: '#3b5998',
                },
                img: {
                    color: '#3b5998',
                },
            }
        },
        twitterIcon: {
            color: '#00aced',
            '&:hover': {
                color: '#00aced',
                svg: {
                    color: '#00aced',
                },
                img: {
                    color: '#00aced',
                },
            }
        },
        youtubeIcon: {
            color: 'red',
            '&:hover': {
                color: 'red',
                svg: {
                    color: 'red',
                },
                img: {
                    color: 'red',
                },
            }
        },
        instagramIcon: {
            img: {
                height: '30px'
            },
        },
        slackIcon: {

        }
    }
}