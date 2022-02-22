export const InfoCardStyles = {
    infocard: {
        width: '100%',
        height: '100%'
    },
    thumbnail: {
        borderRadius: '7px 7px 0 0',
        overflow: 'hidden',
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: ['repeat(1,1fr)','repeat(2,1fr)','repeat(1,1fr)','repeat(2,1fr)'],
        left: '0',
        width: '100%',
        height: '100%',
        img: {
          width: ['200px','100%','200px','100%'],
          maxHeight: ['150px'],
          margin: ['0 auto','auto 0','0 auto','auto 0']
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
        p: {
            color: 'text_secondary'
        }
    }
}