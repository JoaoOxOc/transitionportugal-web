export const AccessibilityStyles = (props) => {
    return {
        accessibilityToggle: {
            position: 'fixed',
            zIndex: 3,
            boxShadow:'0 0 10px 0 rgb(0 0 0 / 100%)',
            right: props.posRight,
            left: props.posLeft,
            top: props.posTop,
            bottom: props.posBottom,
            cursor: 'pointer',
            transition: props.posLeft != null ? 'left' : 'right' + ' 1s'
        },
        accessibilityToggled: {
            position: 'fixed',
            zIndex: 3,
            boxShadow:'0 0 10px 0 rgb(0 0 0 / 100%)',
            right: 'calc(' + props.posRight + ' + 200px)',
            left: 'calc(' + props.posLeft + ' + 200px)',
            top: props.posTop,
            bottom: props.posBottom,
            cursor: 'pointer',
            transition: props.posLeft != null ? 'left' : 'right' + ' 1s'

        },
        accessibilityToggleContainer: {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '10px',
            backgroundColor: '#307568',
            color: 'white',
            svg: {
                height: '30px',
                width: '30px'
            }
        },
        accessibilityInnerContainer: {
            top: props.posTop,
            bottom: props.posBottom,
            backgroundColor: 'white',
            width: '200px',
            height: '300px',
        },
        accessibilityInnerContainerHidden: {
            position: 'fixed',
            right: props.posRight != null ? '-200px': null,
            left: props.posLeft != null ? '-200px' : null,
            transition: props.posLeft != null ? 'left' : 'right' + ' 1s'
        },
        accessibilityInnerContainerToggled: {
            position: 'fixed',
            right: props.posRight,
            left: props.posLeft,
            transition: props.posLeft != null ? 'left' : 'right' + ' 1s'
        },
        AcessibilityTitle: {
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '5px'
        }
    }
}