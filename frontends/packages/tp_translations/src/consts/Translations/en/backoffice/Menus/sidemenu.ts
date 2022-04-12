import * as deepFreeze from 'deep-freeze';

export const SIDEMENU_TRANSLATIONS = deepFreeze({
    SIDEMENU_HEADERS: {
        general: "General",
        content: "Website Content",
        management: "Management",
        Settings: "Settings"
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
        associations: "Associations/Entities",
        profiles: "Profiles",
        scopes: "Permissions",
        newsletter: "Newsletter Subscriptions",
        privacy: "Policy & Privacy"
    },
    SIDEMENU_SETTINGS: {
        email: "Email Sending",
        emailTemplates: "Email Templates",
        userAuth: "Auth Settings",
        clientApps: "Authorized Client Applications"
    }
} as const);