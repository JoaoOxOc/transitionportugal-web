export const InfoCardStyles = {
    infocard: {
        width: '100%',
        height: '100%'
    },
    thumbnail: {
        borderRadius: '7px 7px 0 0',
        overflow: 'hidden',
        display: 'flex',
        left: '0',
        width: '100%',
        height: '100%',
        img: {
          width: '50%',
          margin: 'auto 0'
        },
    },
    thumbnailonly: {
        borderRadius: '7px 7px 0 0',
        overflow: 'hidden',
        display: 'flex',
        margin: '0 auto',
        img: {
          width: '100%'
        },
    },
    infoCardContent: {
        display: 'block',
        //width: '100%',
        paddingLeft: '20px',
        title: {
            width: '100%',
            textAlign: 'center'
        }
    },
    infoCardParagraphs: {
        width: '100%',
        display: 'block',
        paddingTop: '20px',
        justifyContent: 'space-between',
        alignItem: 'center',
    }
}