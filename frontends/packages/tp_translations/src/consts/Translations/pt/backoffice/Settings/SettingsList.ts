import * as deepFreeze from 'deep-freeze';

export const SETTINGSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        actions: "Ações",
        view: "Visualizar"
    },
    SETTINGOBJECT: {
        description: "Descrição",
        key: "Chave",
        defaultValue: "Valor por Omissão",
        value: "Valor"
    }
} as const);