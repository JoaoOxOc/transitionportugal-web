import * as deepFreeze from 'deep-freeze';

export const SETTINGSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        actions: "Actions",
        view: "View"
    },
    SETTINGOBJECT: {
        description: "Description",
        key: "Key",
        defaultValue: "Default Value",
        value: "Value"
    }
} as const);