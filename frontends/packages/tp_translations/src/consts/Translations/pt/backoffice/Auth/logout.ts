import * as deepFreeze from 'deep-freeze';

export const LOGOUT_TRANSLATIONS = deepFreeze({
    LABELS: {
        pageTitle: "Sair - Transição Portugal",
        title: "Está a sair da plataforma Transição Portugal...",
        subtitle: "Tem a certeza de que deseja sair?",
        goBackButton: "Voltar",
        goBackButtonDescription: "Botão para voltar à página anterior",
        signOutButton: "Sair",
        signOutDescription: "Botão para sair da plataforma Transição Portugal"
    }
} as const);