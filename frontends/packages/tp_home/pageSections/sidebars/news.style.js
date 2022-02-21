export const NewsStyles = (props) => {
    return {
        newsToggle: {
            position: 'fixed',
            zIndex: 1,
            borderRadius: '30px 0 0 30px',
            boxShadow:'0 0 10px 0 rgb(0 0 0 / 100%)',
            right: props.posRight,
            left: props.posLeft,
            top: props.posTop,
            bottom: props.posBottom,
            cursor: 'pointer',
            transition: props.posLeft != null ? 'left' : 'right' + ' 1s'
        },
        newsToggled: {
            position: 'fixed',
            zIndex: 1,
            borderRadius: '30px 0 0 30px',
            boxShadow:'0 0 10px 0 rgb(0 0 0 / 100%)',
            right: 'calc(' + props.posRight + ' + 200px)',
            left: 'calc(' + props.posLeft + ' + 200px)',
            top: props.posTop,
            bottom: props.posBottom,
            cursor: 'pointer',
            transition: props.posLeft != null ? 'left' : 'right' + ' 1s'

        },
        newsToggleContainer: {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: ['3px','3px','3px','5px'],
            borderRadius: '30px 0 0 30px',
            backgroundColor: '#307568',
            backgroundImage: 'linear-gradient(90deg, #C99700 -7.69%, #307568 92.31%)',
            color: 'white',
            svg: {
                height: ['20px','20px','20px','30px'],
                width: ['20px','20px','20px','30px']
            }
        },
        newsInnerContainer: {
            top: props.posTop,
            bottom: props.posBottom,
            backgroundColor: 'white',
            width: '200px',
            height: '300px',
        },
        newsInnerContainerHidden: {
            position: 'fixed',
            right: props.posRight != null ? '-200px': null,
            left: props.posLeft != null ? '-200px' : null,
            transition: props.posLeft != null ? 'left' : 'right' + ' 1s'
        },
        newsInnerContainerToggled: {
            position: 'fixed',
            right: props.posRight,
            left: props.posLeft,
            transition: props.posLeft != null ? 'left' : 'right' + ' 1s'
        },
    }
}