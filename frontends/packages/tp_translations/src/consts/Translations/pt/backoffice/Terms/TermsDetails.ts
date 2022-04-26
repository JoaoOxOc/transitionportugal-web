import * as deepFreeze from 'deep-freeze';

export const TERMSDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        termsDetails: "Detalhes dos Termos & Condições - {{name}}",
        termsCreate: "Novo registo de Termos & Condições",
        versionSmall: "Versão {{versionNumber}}",
        termsCreateSmall: "Novos Termos & Condições",
        goBack: "Voltar",
        registerTermsInfo: "O visual de edição não é equivalente ao que o utilizador irá ver",
        termsBeenActiveWarning: "Esta versão dos Termos & Condições está/esteve activa. Clone a mesma para editá-la",
        termsWarning: "Atenção a colocar este registo como activo: o utilizador final irá consentir com esta nova versão dos Termos & Condições"
    },
    LIST: {
        termsTitle: "Termos & Condições",
        home: "Home",
        management: "Administração",
        terms: 'Termos & Condições'
    },
    FORM: {
        description: "Descrição",
        language: "Linguagem",
        selectLanguage: "Linguagem dos Termos & Condições: a edição abaixo corresponde à Linguagem seleccionada",
        version: "Versão",
        isActive: "Activo",
        DataBlocksJson: "Conteúdo dos Termos & Condições",
        updatedAt: "Actualizado em",
        createdAt: "Registado em",
        editorPlaceholder: "Comece a escrever aqui, as opções de edição irão aparecer...",
        saveButton: "Guardar"
    },
    MESSAGES: {
        descriptionTooBig: "A descrição é demasiado grande. Máx. de caracteres: {{max}}",
        descriptionRequired: "A descrição é obrigatória",
        termsUpdatedSuccessfully: "Termos & Condições versão {{termsName}} foi atualizada com sucesso",
        termsCreatedSuccessfully: "Termos & Condições versão {{termsName}} foi registada com sucesso",
        termsGeneralError: "Erro ao registar/atualizar Termos & Condições versão {{termsName}}. Por favor tente novamente",
        termsNotFound: "Termos & Condições versão {{termsName}} não foi encontrada. Por favor verifica se a versão está correcta",
        termsLockedForEdition: "Termos & Condições versão {{termsName}} está bloqueado para edição - esta versão está/esteve activa. Clone a mesma para editá-la",
    }
} as const);