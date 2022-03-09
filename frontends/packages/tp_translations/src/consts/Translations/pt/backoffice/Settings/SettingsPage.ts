import * as deepFreeze from 'deep-freeze';

export const SETTINGSPAGE_TRANSLATIONS = deepFreeze({
    LABELS: {
        emailSettings: "Gestão das Definições de Email",
        emailTemplatesSettings: "Gestão de Templates de Email",
        userAuthSettings: "Gestão de Autenticação/Autorização",
    },
    MESSAGES: {
        emailSettingsDescription: "Todos os aspectos relativos ao envio de emails podem ser geridos nesta página"
    }
} as const);