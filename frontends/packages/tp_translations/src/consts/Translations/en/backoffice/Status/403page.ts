import * as deepFreeze from 'deep-freeze';

export const PAGE403_TRANSLATIONS = deepFreeze({
    LABELS: {
        pageTitle: "Status - Forbidden",
        mainMessage: "You don't have permissions to access this page: {{forbiddenurl}}",
        description: "If you consider that you should have permissions to access it, please contact website administration for them to check for the reason why you don't have permission",
        homepage: "Go to homepage",
        forbiddenImage: "Forbidden"
    },
    BOTTOM: {
        adminEmail: "Administration email"
    }
} as const);