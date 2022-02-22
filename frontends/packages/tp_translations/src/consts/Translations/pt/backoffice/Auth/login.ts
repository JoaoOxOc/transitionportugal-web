import * as deepFreeze from 'deep-freeze';

export const LOGIN_TRANSLATIONS = deepFreeze({
    LABELS: {
        pageTitle: "Entrar - Transição Portugal",
        title: "Entrar",
        subtitle: "Preencha os seguintes campos para entrar com a sua conta.",
        noAccount: "Ainda não tem conta?",
        registerHere: "Registe-se aqui"
    },
    COVER: {
        title: "Um enorme movimento de mudança",
        description: "Desde o suporte comunitário até aos municípios em transição, da-mos o nosso melhor para colocar o mundo em transição",
        subtitle: "Queres saber mais sobre nós?",
        subtitleDescription: "Por favor navega na secção \"Sobre\" na página principal.",
        subtitleLink: "Sobre nós",
        innerCircle: "Círculo Interior",
        innerTransition: "Transição Interior",
        circularEconomy: "Economia Circular",
        transitionTowns: "Municípios em Transição"
    }
} as const);