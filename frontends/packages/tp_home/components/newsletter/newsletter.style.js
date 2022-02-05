export const NewsletterStyles = {
    newsletter: {
        width: '100%'
    },
    newsletterForm: {
        width: '100%',
        input: {
            boxSizing: 'border-box',
            margin: 0,
            minWidth: 0,
            display: 'block',
            width: '100%',
            padding: '2px',
            appearance: 'none',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            border: '1px solid',
            borderRadius: '4px',
            color: 'inherit',
            backgroundColor: 'white',
            borderColor: 'var(--theme-ui-colors-border_color)',
            height: '40px',
            marginBottom: '15px',
            '--theme-ui-input-autofill-bg': 'var(--theme-ui-colors-background)',
            '&::focus': {
                borderColor: 'var(--theme-ui-colors-primary)',
                boxShadow: '0 0 0 0 var(--theme-ui-colors-primary)',
                outline: 'none'
            }
        },
        button: {
            backgroundColor: '#C99700',
            padding: '10px 30px'
        }
    }
}