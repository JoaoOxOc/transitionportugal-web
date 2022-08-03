import * as deepFreeze from 'deep-freeze';

export const HEADER_TRANSLATIONS = deepFreeze({
    TOPBAR: {
        welcome: "Bem-vindo {{username}}",
        welcomeInfo: "Botão para abrir o menu de opções da sua conta",
        notsigned: "Já pertence ao nosso grupo?",
        loginLinkInfo: "Link para a página de autenticação",
        login: "Autentique-se",
        registerLinkInfo: "Link para a página de registo",
        register: "Registe-se",
        userProfileInfo: "Botão para aceder à sua Área de Utilizador",
        userProfile: "Área de Utilizador",
        userLogoutInfo: "Botão para realizar logout",
        userLogout: "Sair",
    },
    MENU: {
        transitionMovement: "Movimento Transição",
        history: "História",
        presentation: "Apresentação",
        about: "Sobre o Movimento",
        map: "Encontrar Grupos",
        events: "Eventos",
        news: "Notícias",
        staff: "Equipa"
    }
} as const);