export const UserBannerStyles = {
    userAuthenticatedMenu: {
        margin: 0,
        padding: '0 !important',
        fontSize: '14px',
        userOptionsButton: {
            padding: '5px !important',
            backgroundColor: 'rgba(255,255,255,.88)',
            border: '1px solid #B0E2E0',
            borderRadius: '8px',
            boxSizing: 'border-box',
            cursor: 'pointer',
            '&:hover': {
                border: '1px solid #9BBABF',
                backgroundColor: 'rgba(248,250,255,.88)'
            },
            '&:focus': {
                backgroundColor: 'rgba(255,255,255)',
                outline: '1px solid #407276',
                boxShadow: '0px 1px 2px 0px rgb(60 64 67 / 30%), 0px 1px 3px 1px rgb(60 64 67 / 15%)'
            }
        },
        usernameContainer: {
            maxWidth: '140px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            userIdSpan: {
                '-webkit-hyphens': 'auto',
                '-moz-hyphens': 'auto',
                '-ms-hyphens': 'auto',
                hyphens: 'auto',
            }
        }
    },
    userContainerTopBar: {
        marginTop: '7px'
    },
    userContainer: {
        position: 'relative',
        '-webkit-align-items': 'center',
        '-webkit-box-align': 'center',
        '-ms-flex-align': 'center',
        alignItems: 'center',
        display: '-webkit-box',
        display: '-webkit-flex',
        display: '-ms-flexbox',
        display: 'flex',
        userTopBlock: {
            display: 'inline-flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: {
                color: '#111'
            }
        },
        userInlineBlock: {
            display: 'inline-flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            p: {
                color: '#111',
                paddingTop: '15px',
                fontSize: '14px'
            }
        },
        userSidemenu: {
            display: 'block',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: {
                color: '#111'
            }
        },
        userImage: {
            position: 'relative',
            width: '40px',
            height: '40px',
            justifyContent: 'center',
            margin: '0 auto'
        },
        userInlineImage: {
            position: 'relative',
            height: '80%',
            justifyContent: 'center',
            marginRight: '0'
        },
        img: {
            //position: 'absolute',
            maxWidth: '500px',
            height: '100%'
        },
        p: {
            svg: {
                marginTop: '-3px'
            }
        },
        userOptionsContainer: {
            paddingLeft: '2px',
            boxSizing: 'border-box',
            height: '48px',
            lineHeight: 'normal',
            padding: '0 4px',
            flex: '0 0 auto',
            justifyContent: 'flex-end',
            verticalAlign: 'middle',
            whiteSpace: 'nowrap',
            alignItems: 'center',
            display: 'flex'
        },
        userIdContainer: {
            marginLeft: '10px',
            marginRight: '4px',
            backgroundColor: 'rgba(255,255,255,.88)',
            border: '1px solid #dadce0',
            boxSizing: 'border-box',
            cursor: 'pointer',
            display: 'inline-block',
            maxHeight: '48px',
            overflow: 'hidden',
            outline: 'none',
            padding: 0,
            verticalAlign: 'middle',
            width: '134px',
            borderRadius: '8px',
            lineHeight: 'normal',
            whiteSpace: 'nowrap',
            font: '13px/27px Roboto,Arial,sans-serif',
            usernameContainer: {
                display: 'inherit',
                usernameDisplay: {
                    display: 'inline-block',
                    paddingBottom: '2px',
                    paddingLeft: '7px',
                    paddingTop: '2px',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    lineHeight: '32px',
                    width: '78px'
                }
            },
            userAvatarContainer: {
                paddingLeft: '6px',
                padding: '4px 2px',
                flex: '0 1 auto',
                display: 'inline-block',
                verticalAlign: 'middle'
            }
        },
        appsMenuContainer: {
            paddingLeft: 0,
            padding: '4px 2px',
            display: 'inline-block',
            verticalAlign: 'middle',
            appsMenuButton: {
                color: '#000',
                cursor: 'pointer',
                textDecoration: 'none',
                backgroundPosition: '-64px -29px',
                borderRadius: '50%',
                padding: '8px',
                display: 'inline-block',
                verticalAlign: 'middle',
                boxSizing: 'border-box',
                height: '40px',
                width: '40px',
                '&:hover': {
                    backgroundColor: 'rgba(60,64,67,.08)',
                    outline: 'none'
                },
                '&:focus': {
                    opacity: 1
                },
                appsMenuIcon: {
                    color: '#5f6368',
                    opacity: 1,
                    fill: 'currentColor'
                }
            }
        }
    },
}