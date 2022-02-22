import * as deepFreeze from 'deep-freeze';

export const BOTTOM_MENU_TRANSLATIONS = deepFreeze({
    PRIVACY_MENU: {
        policy: "Política de Privacidade",
        sitemap: "Mapa do Site"
    },
    MENU: {
        about: "Sobre o Movimento",
        map: "Encontrar Grupos",
        events: "Eventos",
        news: "Notícias",
        staff: "Equipa"
    }
} as const);