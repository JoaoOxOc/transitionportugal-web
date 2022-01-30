export const AccessibilityStyles = (props) => {
    return {
        accessibilityToggle: {
            position: 'fixed',
            zIndex: 1,
            boxShadow:'0 0 10px 0 rgb(0 0 0 / 100%)',
            right: props.posRight,
            left: props.posLeft,
            top: props.posTop,
            bottom: props.posBottom,
        },
        accessibilityToggleContainer: {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '10px',
            backgroundColor: '#307568',
            color: 'white',
            svg: {
                height: '40px',
                width: '40px'
            }
        }
    }
}