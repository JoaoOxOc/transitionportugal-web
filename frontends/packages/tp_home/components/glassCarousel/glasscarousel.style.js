export const GlassCarouselStyles = {
    carouselCard: {
        height: '320px',
        width: ['300px','350px','400px','500px','600px'],
        bottom: 0,
        //right: 0,
        margin: '0 auto',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgb(0 0 0 / 10%)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(90, 173, 181, 0.3)',
        h1: {
            padding: '10px',
        }
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
}