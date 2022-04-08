import * as deepFreeze from 'deep-freeze';

export const ROLEDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        associationDetails: "Detalhes da Aplicação Cliente - {{name}}",
        associationCreate: "Registar Nova Autorização de Aplicação Cliente",
        associationCreateSmall: "Registar Nova Aplicação Cliente",
        goBack: "Voltar",
        registerAssociationInfo: "A chave da aplicação cliente será gerada automaticamente após o registo",
        associationWarning: "Atenção à edição dos valores de ID e chave: a aplicação cliente pode deixar de funcionar"
    },
    LIST: {
        associationsTitle: "Associações/Entidades",
        home: "Home",
        settings: "Definições",
        associations: 'Associações'
    },
    FORM: {
        name: "Nome da Aplicação Cliente",
        description: "Descrição da Aplicação Cliente",
        clientId: "ID da Aplicação Cliente",
        clientSecret: "Chave da Aplicação Cliente",
        updatedAt: "Actualizado em",
        createdAt: "Registado em",
        saveButton: "Guardar"
    },
    MESSAGES: {
        nameTooBig: "O Nome é demasiado grande. Máx. de caracteres: {{max}}",
        nameRequired: "O Nome da Aplicação é obrigatório",
        descriptionTooBig: "A Descrição é demasiado grande. Máx. de caracteres: {{max}}",
        descriptionRequired: "A Descrição é obrigatória",
        clientIdTooBig: "O ID é demasiado grande. Máx. de caracteres: {{max}}",
        clientIdRequired: "ID da Aplicação Cliente é obrigatório",
        clientAppUpdatedSuccessfully: "A aplicação cliente cujo nome é {{clientName}} foi atualizada com sucesso",
        clientAppCreatedSuccessfully: "A aplicação cliente cujo nome é {{clientName}} foi registada com sucesso",
        clientAppGeneralError: "Erro ao registar/atualizar a aplicação cliente cujo nome é {{clientName}}. Por favor tente novamente",
        clientAppNotFound: "A aplicação cliente cujo nome é {{clientName}} não foi encontrada. Por favor verifica se o nome está correcto"
    }
} as const);