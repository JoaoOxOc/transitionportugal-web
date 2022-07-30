import * as deepFreeze from 'deep-freeze';

export const HEADER_TRANSLATIONS = deepFreeze({
    TOPBAR: {
        welcome: "Welcome {{username}}",
        notsigned: "Do you already belong here?",
        login: "Sign in"
    },
    MENU: {
        transitionMovement: "Transition Movement",
        history: "History",
        presentation: "Presentation",
        about: "About the Movement",
        map: "Find Groups",
        events: "Events",
        news: "News",
        staff: "Team"
    }
} as const);