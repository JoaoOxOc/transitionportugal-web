import * as deepFreeze from 'deep-freeze';

export const SIDEMENU_TRANSLATIONS = deepFreeze({
    SIDEMENU_USER: {
        profile: "Perfil",
        inbox: "Caixa de Entrada",
        projects: "Projectos",
        posts: "Publicações",
        eventsCalendar: "Calendário de Eventos",
        messenger: "Mensagens",
        logout: "Logout",
    },
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
        contentManagement: "Gestão de Conteúdo do Website",
        banner: "Banner",
        about: "Sobre",
        contacts: "Contactos",
        circularEconomy: "Economia Circular",
        events: "Eventos",
        newsBlog: "Notícias/Publicações",
        donations: "Donativos",
        partners: "Parceiros"
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
    },
    SIDEMENU_PROFILE: {
        association: "Perfil da Sua Associação"
    }
} as const);