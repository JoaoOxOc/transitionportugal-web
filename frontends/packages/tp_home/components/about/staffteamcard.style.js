export const StaffTeamCardStyles = {
    staffteamCard: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: 'white',
        // borderStyle: 'solid',
        // borderWidth: '1px 1px 1px 1px',
        // borderColor: '#e5e5e5',
        boxShadow: '0 4px 10px rgb(39 83 123 / 12%)',
        transition: 'background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s',
        paddingTop: ['20px','20px','25px','30px'],
        paddingBottom: ['20px','20px','25px','30px'],
        paddingLeft: ['20px','20px','25px','30px'],
        paddingRight: ['20px','20px','25px','30px'],
        borderRadius: '8px',
        img: {
            boxSizing: 'border-box',
            margin: 0,
            minWidth: 0,
            maxWidth: '100%',
            width: ['70px','80px','100px','100px','100px','130px'],
            height: ['70px','80px','100px','100px','100px','130px'],
            flexShrink: 0,
            border: '2px solid',
            borderColor: '#49B276',
            borderRadius: '50%'
        },
        '&:hover': {
            h2: {
                color: '#40AE70'
            },
            span: {
                transition: 'color 0.25s',
                color: '#40AE70'
            }
        }
    },
    staffteamCardTitleContainer: {
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        width: '100%',
        textAlign: 'center',
        marginTop: '15px',
        h2: {
            transition: 'color 0.25s',
            marginBottom: '5px',
            letterSpacing: '-.55px',
            fontFamily: '"DM Sans",sans-serif',
            fontWeight: 700,
            fontSize: ['16px','18px','18px','18px','18px','20px']
        }
    },
    staffteamCardTitleJob: {
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        fontSize: ['14px','14px','16px'],
        fontWeight: 'normal',
        lineHeight: 1.5,
        transition: 'color 0.25s'
    },
    staffteamCardDescription: {
        width: '100%',
        paddingTop: '10px',
        marginTop: '10px',
        borderTop: '1px solid #E5ECF4',
        lineHeight: 1.5,
        textAlign: 'justify'
    }
}