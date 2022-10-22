export const UserBannerStyles = {
    userContainer: {
        position: 'relative',
        userBlock: {
            display: 'block',
            width: '100%',
            height: '70px',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '10px',
            textAlign: 'center',
            p: {
                color: '#111'
            }
        },
        userInlineBlock: {
            display: 'inline-flex',
            width: '100%',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '50px',
            p: {
                color: '#111',
                paddingTop: '15px',
                fontSize: '14px'
            }
        },
        userSidemenu: {
            display: 'block',
            width: '100%',
            height: '70px',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '10px',
            textAlign: 'center',
            p: {
                color: '#111'
            }
        },
        userImage: {
            position: 'relative',
            width: '30px',
            height: '50%',
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
            display: 'flex',
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
                    font: '13px/27px Roboto,Arial,sans-serif'
                }
            }
        }
    },
}