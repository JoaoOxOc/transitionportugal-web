import * as deepFreeze from 'deep-freeze';

export const FOOTER_TRANSLATIONS = deepFreeze({
    OPTIONS: {
        inner_transition_alt: "Transição Portugal",
        contacts_alt: "Contacts",
        privacy_alt: "Privacy",
        contacts: "Contacts",
        privacy: "Policy & Privacy"
    },
    BOTTOM: {
        copyright_help: "Showing the copyright message"
    },
} as const);