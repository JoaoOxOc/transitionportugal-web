import * as deepFreeze from 'deep-freeze';

export const LOGOUT_TRANSLATIONS = deepFreeze({
    LABELS: {
        pageTitle: "Sign out - Transição Portugal",
        title: "You're leaving Transição Portugal platform...",
        subtitle: "Are you sure you want to sign out?",
        goBackButton: "Go Back",
        goBackButtonDescription: "Go back to the previous page",
        signOutButton: "Sign Out",
        signOutDescription: "Logout from Transição Portugal platform"
    }
} as const);