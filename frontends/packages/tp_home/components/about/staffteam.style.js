export const StaffTeamStyles = {
    staffteam: {
        width: '100%',
        backgroundColor: '#034146',
        padding: '90px 0px 90px 0px'
    },
    staffteamContainer: {
        display: 'flex',
        marginRight: 'auto',
        marginLeft: 'auto',
        position: 'relative'
    },
    staffteamTitle: {
        display: 'block',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        h2: {
            fontFamily: '"Open Sans",Sans-serif',
            fontSize: ['24px','24px','24px','33px'],
            fontWeight: 600,
            lineHeight: '1.5em',
            marginBottom: '20px',
        }
    },
    staffteamContainerRow: {
        boxSizing: 'border-box',
        margin: 0,
        minWidth: 0,
        width: '100%',
        display: 'grid',
        gap: '60px',
        gridTemplateColumns: ['repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)','repeat(2,1fr)','repeat(3,1fr)']
    },
}