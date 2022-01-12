import * as deepFreeze from 'deep-freeze';

export const HEADER_TRANSLATIONS = deepFreeze({
    TOPBAR: {
        welcome: "Welcome {{username}}",
        notsigned: "Do you already belong here?",
        login: "Sign in"
    }
} as const);