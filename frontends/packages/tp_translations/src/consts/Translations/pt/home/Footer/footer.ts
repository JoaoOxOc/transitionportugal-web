import * as deepFreeze from 'deep-freeze';

export const FOOTER_TRANSLATIONS = deepFreeze({
    OPTIONS: {
        inner_transition_alt: "Transição Portugal",
        contacts_alt: "Contactos",
        privacy_alt: "Privacidade",
        contacts: "Contactos",
        privacy: "Política & Privacidade"
    },
    BOTTOM: {
        copyright_help: "Apresenta-se a mensagem de copyright"
    },
} as const);