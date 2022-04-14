import * as deepFreeze from 'deep-freeze';
export var TERMSDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        roleDetails: "Detalhes do Perfil de Utilizadores - {{name}}",
        roleCreate: "Registar Novo Perfil de Utilizadores",
        roleCreateSmall: "Registar Novo Perfil",
        goBack: "Voltar",
        registerRoleInfo: "Deverá associar permissões a este perfil por forma a atribuir permissões na aplicação aos utilizadores com este perfil",
        roleWarning: "Atenção à edição das permissões: os utilizadores com este perfil atribuído podem perder ou ganhar acesso a certas funcionalidades da aplicação"
    },
    LIST: {
        rolesTitle: "Perfis",
        home: "Home",
        management: "Administração",
        roles: 'Perfis'
    },
    FORM: {
        name: "Nome do Perfil",
        normalizedRoleName: "Nome Perfil - maiúsculas",
        scopes: "Permissões relativas a este Perfil",
        choices: "Permissões disponíveis",
        selected: "Permissões aplicadas",
        updatedAt: "Actualizado em",
        createdAt: "Registado em",
        saveButton: "Guardar"
    },
    MESSAGES: {
        nameTooBig: "O Nome é demasiado grande. Máx. de caracteres: {{max}}",
        nameRequired: "O Nome do Perfil é obrigatório",
        roleUpdatedSuccessfully: "O perfil cujo nome é {{roleName}} foi atualizado com sucesso",
        roleCreatedSuccessfully: "O perfil cujo nome é {{roleName}} foi registado com sucesso",
        roleGeneralError: "Erro ao registar/atualizar o perfil cujo nome é {{roleName}}. Por favor tente novamente",
        roleNotFound: "O perfil cujo nome é {{roleName}} não foi encontrado. Por favor verifica se o nome está correcto"
    }
});
//# sourceMappingURL=TermsDetails.js.map