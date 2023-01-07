import * as deepFreeze from 'deep-freeze';

export const TIMELINE_TRANSLATIONS = deepFreeze({
    TIMELINE: {
        community_image: "Community Image",
        timeline: "Ver a nossa linha do tempo"
    },
    TIMELINE_PAGE: {
        title: "Transição Portugal - linha do tempo"
    },
    TIMELINE_NAV: {
        first: "Voltar ao Início",
        last: "Ir para o Último",
        next: "Próximo",
        play: "Apresentar",
        previous: "Anterior"
    }
} as const);