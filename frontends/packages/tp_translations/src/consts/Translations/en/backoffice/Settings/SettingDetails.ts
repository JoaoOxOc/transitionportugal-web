import * as deepFreeze from 'deep-freeze';

export const SETTINGDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        settingDetails: "Setting Details - {{name}}",
        goBack: "Go back",
        settingWarning: "Careful editting setting value: it can change the app behaviour"
    },
    LIST: {
        emailSettingsTitle: "Email Sending",
        userSettingsTitle: "Authentication",
        home: "Home",
        settings: 'Settings'
    },
    FORM: {
        key: "Key",
        description: "Description",
        defaultValue: "Default Value",
        value: "Value",
        saveButton: "Save"
    }
} as const);