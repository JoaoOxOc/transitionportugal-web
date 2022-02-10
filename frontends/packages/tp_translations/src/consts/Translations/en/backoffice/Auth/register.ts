import * as deepFreeze from 'deep-freeze';

export const REGISTER_TRANSLATIONS = deepFreeze({
    LABELS: {
        pageTitle: "Register - Transição Portugal",
        title: "Register Account",
        subtitle: "Fill in the fields below to sign up for an account.",
        noAccount: "Don't have an account yet?",
        registerHere: "Sign up here"
    },
    COVER: {
        title: "A big movement of change",
        description: "From community support to municipalities in transition, we try our best to set the world on change",
        subtitle: "Want to know more about us?",
        subtitleDescription: "Please scroll in our \"about\" section in the home page.",
        subtitleLink: "About us",
        innerCircle: "Inner Circle",
        innerTransition: "Inner Transition",
        circularEconomy: "Circular Economy",
        transitionTowns: "Transition Towns"
    }
} as const);