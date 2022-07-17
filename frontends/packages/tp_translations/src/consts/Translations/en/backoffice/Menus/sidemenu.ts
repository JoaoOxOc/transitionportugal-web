import * as deepFreeze from 'deep-freeze';

export const SIDEMENU_TRANSLATIONS = deepFreeze({
    SIDEMENU_USER: {
        profile: "Profile",
        inbox: "Inbox",
        projects: "Projects",
        posts: "Posts",
        eventsCalendar: "Events Calendar",
        messenger: "Messenger",
        logout: "Sign out",
    },
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
        contentManagement: "Website Content Management",
        banner: "Banner",
        about: "About",
        contacts: "Contacts",
        circularEconomy: "Circular Economy",
        events: "Events",
        newsBlog: "News/Posts",
        donations: "Donations",
        partners: "Partners"
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
    },
    SIDEMENU_PROFILE: {
        association: "Your Association Profile"
    }
} as const);