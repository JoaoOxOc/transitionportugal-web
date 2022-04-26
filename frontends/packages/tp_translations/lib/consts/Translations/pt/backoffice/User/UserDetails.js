import * as deepFreeze from 'deep-freeze';
export var USERDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        userCreate: "Registar Novo Utilizador",
        userDetails: "Detalhes do Utilizador - {{name}}",
        userCreateSmall: "Registar Novo Utilizador",
        goBack: "Voltar",
        accountStatus: "Estado da Conta",
        active: "Activa",
        inactive: "Inactiva",
        accountEmailVerified: "Email Verificado",
        emailVerified: "Verificado",
        emailNotVerified: "Não Verificado",
        userRole: "Função do utilizador: {{name}}",
        registerUserInfo: "A chave da aplicação cliente será gerada automaticamente após o registo",
        userWarning: "Atenção à edição dos valores de ID e chave: a aplicação cliente pode deixar de funcionar"
    },
    LIST: {
        usersTitle: "Utilizadores",
        home: "Home",
        management: "Administração",
        users: 'Utilizadores'
    },
    TABS: {
        main: "Editar Perfil",
        security: "Segurança/Password"
    },
    ROLES: {
        associationAdmin: "Administrador da Associação",
        associationUser: "Utilizador da Associação",
        admin: "Administrador de Sistema",
        user: "Utilizador de Sistema"
    },
    FORM: {
        name: "Nome",
        userName: "Username",
        email: "Email do Utilizador",
        association: "Associação/Entidade do Utilizador",
        active: "Utilizador Activado",
        verified: "Utilizador Verificado",
        createdAt: "Registado em",
        updatedAt: "Actualizado em",
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
//# sourceMappingURL=UserDetails.js.map