export const DonationStyles = (props) => {
    return {
        donationToggle: {
            position: 'fixed',
            zIndex: 2,
            borderRadius: '30px 0 0 30px',
            boxShadow:'0 0 10px 0 rgb(0 0 0 / 100%)',
            right: props.posRight,
            left: props.posLeft,
            top: props.posTop,
            bottom: props.posBottom,
            cursor: 'pointer',
            transition: props.posLeft != null ? 'left' : 'right' + ' 1s'
        },
        donationToggled: {
            position: 'fixed',
            zIndex: 2,
            borderRadius: '30px 0 0 30px',
            boxShadow:'0 0 10px 0 rgb(0 0 0 / 100%)',
            right: 'calc(' + props.posRight + ' + 200px)',
            left: 'calc(' + props.posLeft + ' + 200px)',
            top: props.posTop,
            bottom: props.posBottom,
            cursor: 'pointer',
            transition: props.posLeft != null ? 'left' : 'right' + ' 1s'

        },
        donationToggleContainer: {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: ['3px','3px','3px','5px'],
            borderRadius: '30px 0 0 30px',
            backgroundColor: '#307568',
            backgroundImage: 'linear-gradient(90deg, #C99700 -7.69%, #307568 92.31%)',
            color: 'red',
            svg: {
                height: ['20px','20px','20px','30px'],
                width: ['20px','20px','20px','30px']
            }
        }
    }
}