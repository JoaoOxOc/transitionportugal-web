export const DonationStyles = (props) => {
    return {
        donationToggle: {
            position: 'fixed',
            zIndex: 1,
            boxShadow:'0 0 10px 0 rgb(0 0 0 / 100%)',
            right: props.posRight,
            left: props.posLeft,
            top: props.posTop,
            bottom: props.posBottom,
        },
        donationToggleContainer: {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '10px',
            backgroundColor: '#307568',
            color: 'red',
            svg: {
                height: '40px',
                width: '40px'
            }
        }
    }
}