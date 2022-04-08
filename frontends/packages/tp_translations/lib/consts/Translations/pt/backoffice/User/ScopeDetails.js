import * as deepFreeze from 'deep-freeze';
export var SCOPEDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        scopeCreate: "Registar Nova Permissão",
        scopeDetails: "Detalhes da Permissão - {{name}}",
        scopeCreateSmall: "Registar Nova Permissão",
        goBack: "Voltar",
        registerScopeInfo: "Deverá associar a permissão a um perfil por forma a ser atribuida a um utilizador",
        scopeWarning: "Atenção à edição do Identificard: os utilizadores podem perder acesso a certas funcionalidades da aplicação"
    },
    LIST: {
        scopesTitle: "Permissões",
        home: "Home",
        management: "Administração",
        scopes: 'Permissões'
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
});
//# sourceMappingURL=ScopeDetails.js.map