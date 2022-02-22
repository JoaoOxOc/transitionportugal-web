import * as deepFreeze from 'deep-freeze';

export const CONTACTS_TRANSLATIONS = deepFreeze({
    CONTACTS: {
        email_input_label: "Email",
        email_input_help: "Insert the email where you will receive the newsletter",
        email_input_placeholder: "Your email...",
        subscribe_button: "Subscribe"
    },
} as const);