import * as deepFreeze from 'deep-freeze';

export const HEADER_TRANSLATIONS = deepFreeze({
    TOPBAR: {
        welcome: "Bem-vindo {{username}}",
        notsigned: "Já pertence ao nosso grupo?",
        login: "Autentique-se"
    },
    MENU: {
        about: "Sobre o Movimento",
        map: "Encontrar Grupos",
        events: "Eventos",
        news: "Notícias",
        staff: "Equipa"
    }
} as const);