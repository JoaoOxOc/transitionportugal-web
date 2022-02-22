import { makeStyles } from '@material-ui/core/styles';

import { COLORS as colors } from '../../theme/parameters';

const drawerWidth = 320;

export const LeafStyles = (props) => {
    console.log(props)
    return {
        LeafContainer: {
            position: 'relative',
            width: '100%',
            height: '100%'
        },
        LeafWrapper: {
            position: 'absolute',
            width: props.width,
            left: props.posLeft,
            right: props.posRight,
            top: props.posTop,
            bottom: props.posBottom
        },
        LeafImage: {
            position: 'relative',
            filter: 'drop-shadow(5px 8px 1px rgba(130,130,170,1))'
        }
    }
};