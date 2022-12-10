import * as deepFreeze from 'deep-freeze';

export const ABOUT_TRANSLATIONS = deepFreeze({
    ABOUT: {
        community_image: "Imagem da Comunidade",
        timeline: "Veja a nossa linha do tempo"
    },
    ABOUT_PAGE: {
        title: "Transição Portugal"
    }
} as const);