import * as deepFreeze from 'deep-freeze';

export const SETTINGDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        settingDetails: "Detalhes da Definição - {{name}}",
        goBack: "Voltar",
        settingWarning: "Atenção à edição do Valor: pode provocar alterações no comportamento de toda a aplicação"
    },
    LIST: {
        emailSettingsTitle: "Envio de Emails",
        userSettingsTitle: "Autenticação",
        home: "Home",
        settings: 'Definições'
    },
    FORM: {
        key: "Chave",
        description: "Descrição",
        defaultValue: "Valor por Omissão",
        value: "Valor",
        saveButton: "Guardar"
    }
} as const);