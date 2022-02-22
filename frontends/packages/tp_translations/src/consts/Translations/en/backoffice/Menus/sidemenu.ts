import * as deepFreeze from 'deep-freeze';

export const SIDEMENU_TRANSLATIONS = deepFreeze({
    SIDEMENU_HEADERS: {
        general: "General",
        content: "Website Content",
        management: "Management"
    },
    SIDEMENU_GENERAL: {
        dashboard: "Dashboard"
    },
    SIDEMENU_CONTENT: {
        banner: "Banner",
        about: "About",
    },
    SIDEMENU_MANAGEMENT: {
        users: "Users",
        profiles: "Profiles",
        newsletter: "Newsletter Subscriptions",
        privacy: "Policy & Privacy"
    }
} as const);