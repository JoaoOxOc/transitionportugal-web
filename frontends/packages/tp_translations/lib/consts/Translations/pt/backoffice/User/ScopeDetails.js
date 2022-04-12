import * as deepFreeze from 'deep-freeze';
export var SCOPEDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        scopeCreate: "Registar Nova Permissão",
        scopeDetails: "Detalhes da Permissão - {{name}}",
        scopeCreateSmall: "Registar Nova Permissão",
        goBack: "Voltar",
        registerScopeInfo: "Deverá associar a permissão a um perfil por forma a ser atribuida a um utilizador",
        scopeWarning: "Atenção à edição dos perfis: os utilizadores podem perder ou ganhar acesso a certas funcionalidades da aplicação"
    },
    LIST: {
        scopesTitle: "Permissões",
        home: "Home",
        management: "Administração",
        scopes: 'Permissões'
    },
    FORM: {
        name: "Identificador da Permissão",
        description: "Descrição",
        scopeRoles: "Perfis relacionados com esta Permissão",
        choices: "Perfis disponíveis",
        selected: "Perfis onde já está aplicada",
        updatedAt: "Actualizado em",
        createdAt: "Registado em",
        saveButton: "Guardar"
    },
    MESSAGES: {
        nameTooBig: "O Identificador é demasiado grande. Máx. de caracteres: {{max}}",
        nameRequired: "O Identificador da Permissão é obrigatório",
        descriptionTooBig: "A Descrição é demasiado grande. Máx. de caracteres: {{max}}",
        descriptionRequired: "A Descrição é obrigatória",
        scopeUpdatedSuccessfully: "A permissão cujo identificador é {{scopeName}} foi atualizada com sucesso",
        scopeCreatedSuccessfully: "A permissão cujo identificador é {{scopeName}} foi registada com sucesso",
        scopeGeneralError: "Erro ao registar/atualizar a permissão cujo identificador é {{scopeName}}. Por favor tente novamente",
        scopeNotFound: "A permissão cujo identificador é {{scopeName}} não foi encontrada. Por favor verifica se o identificador está correcto"
    }
});
//# sourceMappingURL=ScopeDetails.js.map