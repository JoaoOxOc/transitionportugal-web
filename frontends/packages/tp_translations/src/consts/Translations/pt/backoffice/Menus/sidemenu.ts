import * as deepFreeze from 'deep-freeze';

export const SIDEMENU_TRANSLATIONS = deepFreeze({
    SIDEMENU_HEADERS: {
        general: "Geral",
        content: "Conteúdo do Website",
        management: "Administração"
    },
    SIDEMENU_GENERAL: {
        dashboard: "Dashboard"
    },
    SIDEMENU_CONTENT: {
        banner: "Banner",
        about: "Sobre",
    },
    SIDEMENU_MANAGEMENT: {
        users: "Utilizadores",
        profiles: "Perfis",
        newsletter: "Subscrições da Newsletter",
        privacy: "Política & Privacidade"
    }
} as const);