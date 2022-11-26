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
            maxWidth: '100%',
        },
        'a > img': {
            maxWidth: '100%',
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
                display: 'inline',
                position: 'relative',
            },
            p: {
                textAlign: 'left'
            }
        },
        'table': {
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '720px',
            'tr:nth-of-type(even)': {
                backgroundColor: '#f2f2f2',
            },
            'tr:hover': {
                backgroundColor: '#ddd'
            },
            'th': {
                paddingTop: '12px',
                paddingBottom: '12px',
                textAlign: 'left',
                backgroundColor: '#008C99',
                color: 'white'
            },
            'td, th': {
                border: '1px solid #ddd',
                padding: '8px'
            }
        },
        'figure:is(.table)': {
            overflowX: 'auto'
        },
        'figure:is(.table) > figcaption': {
            width: '100%',
            textAlign: 'center',
            padding: '5px'
        },
        'ol > li': {
            counterIncrement: 'editorjs-viewer-listitem',
            '&::marker': {
                display: 'inline-block',
                content: 'counters(editorjs-viewer-listitem, ".") ". "'
            }
        },
        'ol:is(ol)': {
            listStyleType: 'none !important',
            counterReset: 'editorjs-viewer-listitem',
        },
        '.media': {
            width: '100%',
            height: '100%'
        },
        'embed': {
            width: '100%',
            height: '100%',
            maxWidth: '600px',
            maxHeight: '400px',
            minHeight: '300px'
        }
    },
    parsedSectionContainer: {
        position: 'relative',
        marginBottom: '40px',
        paddingTop: '20px',
        '&::before': {
            content: '""',
            backgroundColor: colors.sidemenu_section_separator_dot_color,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            left: '-20px',
            top: 0,
            zIndex: 1,
            position: 'absolute'
        },
        '&::after': {
            content: '""',
            width: '70vw',
            height: '2px',
            left: '-20px',
            top: '4px',
            position: 'absolute',
            background: 'linear-gradient(to right,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-ms-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-o-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-webkit-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-moz-linear-gradient(left,#e0e0e0 0,#e0e0e0 35%,#e0e0e0 65%,#fff 100%)',
            background: '-webkit-gradient(linear,left top,right top,color-stop(0%,#e0e0e0),color-stop(35%,#e0e0e0),color-stop(65%,#e0e0e0),color-stop(100%,#fff))'
        }
    },
    sectionCard: {
        width: ['100%'],
        margin: '0 auto',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgb(0 0 0 / 10%)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(90, 173, 181, 0.3)',
        padding: '20px',
    },
}