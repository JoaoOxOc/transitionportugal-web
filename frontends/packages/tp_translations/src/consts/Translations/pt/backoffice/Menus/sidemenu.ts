import * as deepFreeze from 'deep-freeze';

export const SIDEMENU_TRANSLATIONS = deepFreeze({
    SIDEMENU_HEADERS: {
        general: "Geral",
        content: "Conteúdo do Website",
        management: "Administração",
        Settings: "Definições"
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
        associations: "Associações/Entidades",
        profiles: "Perfis",
        scopes: "Permissões",
        newsletter: "Subscrições da Newsletter",
        privacy: "Política & Privacidade"
    },
    SIDEMENU_SETTINGS: {
        email: "Envio de Emails",
        emailTemplates: "Templates de Email",
        userAuth: "Definições de Autenticação",
        clientApps: "Aplicações Cliente Autorizadas"
    }
} as const);