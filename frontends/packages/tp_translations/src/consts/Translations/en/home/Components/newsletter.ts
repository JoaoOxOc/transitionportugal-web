import * as deepFreeze from 'deep-freeze';

export const NEWSLETTER_TRANSLATIONS = deepFreeze({
    NEWSLETTER: {
        email_input_label: "Subscribe our newsletter",
        email_input_help: "Insert the email where you will receive the newsletter",
        email_input_placeholder: "Your email...",
        subscribe_button: "Subscribe"
    },
} as const);