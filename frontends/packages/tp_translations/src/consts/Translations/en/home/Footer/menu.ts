import * as deepFreeze from 'deep-freeze';

export const BOTTOM_MENU_TRANSLATIONS = deepFreeze({
    PRIVACY_MENU: {
        policy: "Privacy Policy",
        sitemap: "Site Map"
    },
    MENU: {
        about: "About the Movement",
        map: "Find Groups",
        events: "Events",
        news: "News",
        staff: "Team"
    }
} as const);