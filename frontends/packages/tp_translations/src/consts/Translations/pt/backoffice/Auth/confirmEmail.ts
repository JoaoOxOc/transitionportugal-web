import * as deepFreeze from 'deep-freeze';

export const CONFIRMEMAIL_TRANSLATIONS = deepFreeze({
    LABELS: {
        pageTitle: "Confirmar Email - Transição Portugal",
        title: "Confirmar Email",
        successMessage: "O teu email foi confirmado. Por favor aguarda pela aprovação da tua conta antes de realizares autenticação na aplicação",
        expiredToken: "A confirmação do email expirou. Por favor contacta a transição Portugal para obter ajuda",
        buttonToLogin: "Botão de link para a página de autenticação",
        goLogIn: "Continuar para a página de autenticação"
    }
} as const);