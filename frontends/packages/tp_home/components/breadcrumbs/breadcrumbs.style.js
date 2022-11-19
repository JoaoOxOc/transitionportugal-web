
import { COLORS as colors } from '../../theme/parameters';

export const breadcrumbStyles = {
    breadcrumbLink: {
        cursor: 'pointer',
        color: colors.logo_color,
        svg: {
            marginTop: '-5px'
        }
    },
    breadcrumbText: {
        fontSize: '16px',
        fontWeight: '600 !important',
        svg: {
            marginTop: '-5px'
        }
    },
    bottomLine: {
        position: 'absolute',
        width: '100%',
        marginTop: '38px',
        borderBottom: "1px solid " + colors.nav_border_bottom,
    }
}