import { COLORS as colors } from '../../theme/parameters';

export const DynamicPageSectionStyles = {
    dynamicPageSectionContainer: {
        pt: "50px",
        pb: "50px",
        'p:has(img)': {
            display: 'inline-flex'

        },
        'p > img': {
            padding: '5px 15px 5px 5px'
        },
        'p:has(img) > a': {
            padding: '5px 15px 5px 5px',
            maxWidth: '50%'

        },
        '.image > img': {
            maxWidth: '100%'
        },
        '.image-style-side': {
            float: 'right',
            maxWidth: '50%'
        },
        'figure:not(.table) > figcaption': {
            width: '100%',
            textAlign: 'center',
            padding: '5px'
        },
        'blockquote': {
            background: '#f9f9f9',
            borderLeft: '10px solid #ccc',
            margin: '1.5em 10px',
            padding: '0.5em 10px',
            quotes: 'auto',//'"0o201D""0o2018""0o2019"',
            '&:before': {
                color: '#ccc',
                content: 'open-quote',
                fontSize: '4em',
                lineHeight: '0.1em',
                marginRight: '0.25em',
                verticalAlign: '-0.4em'
            },
            // '&:after': {
            //     color: '#ccc',
            //     content: 'close-quote',
            //     fontSize: '4em',
            //     lineHeight: '0.1em',
            //     marginRight: '0.25em',
            //     verticalAlign: '-0.4em'
            // },
            'h1, h2, h3, h4': {
                display: 'inline'
            },
            p: {
                textAlign: 'left'
            }
        },
        'oembed': {
            width: '100%'
        }
    },
    parsedSectionContainer: {
        '&::after': {
            content: '""',
            width: '180px',
            height: '1px',
            left: '10px',
            position: 'absolute',
            background: 'linear-gradient(to right,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-ms-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-o-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-webkit-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-moz-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-webkit-gradient(linear,left top,right top,color-stop(0%,#e0e0e0),color-stop(35%,#e0e0e0),color-stop(65%,#e0e0e0),color-stop(100%,#fff))'
        }
    },
    sectionContainerBottom: {
        width: '100%',
        '&::after': {
            content: '""',
            backgroundColor: colors.sidemenu_section_separator_dot_color,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            left: '10px',
            bottom: 0,
            zIndex: 1,
            position: 'absolute'
        },
    }
}