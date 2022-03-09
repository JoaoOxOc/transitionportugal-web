import * as deepFreeze from 'deep-freeze';

export const SETTINGSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        emailSettings: "Email Settings Management",
        emailTemplatesSettings: "Email Templates Management",
        userAuthSettings: "Authentication/Authorization Management",
    },
    MESSAGES: {
        emailSettingsDescription: "All aspects related to sending emails can be managed from this page"
    }
} as const);