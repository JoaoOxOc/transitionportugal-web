import * as deepFreeze from 'deep-freeze';

export const TERMSDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        termsDetails: "Detalhes dos Termos & Condições - {{name}}",
        termsCreate: "Novo registo de Termos & Condições",
        termsCreateSmall: "Novos Termos & Condições",
        goBack: "Voltar",
        registerTermsInfo: "O visual de edição não é equivalente ao que o utilizador irá ver",
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
        isActive: "Activado",
        DataBlocksJson: "Conteúdo dos Termos & Condições",
        updatedAt: "Actualizado em",
        createdAt: "Registado em",
        saveButton: "Guardar"
    },
    MESSAGES: {
        descriptionTooBig: "A descrição é demasiado grande. Máx. de caracteres: {{max}}",
        descriptionRequired: "A descrição é obrigatória",
        roleUpdatedSuccessfully: "O perfil cujo nome é {{termsName}} foi atualizado com sucesso",
        roleCreatedSuccessfully: "O perfil cujo nome é {{termsName}} foi registado com sucesso",
        roleGeneralError: "Erro ao registar/atualizar o perfil cujo nome é {{termsName}}. Por favor tente novamente",
        roleNotFound: "O perfil cujo nome é {{termsName}} não foi encontrado. Por favor verifica se o nome está correcto"
    }
} as const);