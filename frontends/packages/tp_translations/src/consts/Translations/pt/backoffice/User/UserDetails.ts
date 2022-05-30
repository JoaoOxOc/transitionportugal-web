import * as deepFreeze from 'deep-freeze';

export const USERDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        userCreate: "Registar Novo Utilizador",
        userDetails: "Detalhes do Utilizador - {{name}}",
        userCreateSmall: "Registar Novo Utilizador",
        goBack: "Voltar",
        view: "Visualizar Associação",
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
        security: "Segurança/Password",
        roles: "Perfis do Utilizador"
    },
    ROLES: {
        AssociationAdmin: "Administrador da Associação",
        AssociationUser: "Utilizador da Associação",
        Admin: "Administrador de Sistema",
        User: "Utilizador de Sistema"
    },
    CONNECTED_ACCOUNTS: {
        discourse: "Discourse",
        discourseDescription: "Define se estás conectado ao Discourse da Transição Portugal",
        connected: "Conectado",
        disconnected: "Desconectado"
    },
    FORM: {
        personalDetails: "Detalhes Pessoais",
        personalDetailsMessage: "Gerir informações dos dados pessoais",
        accountContacts: "Contactos",
        accountContactsMessage: "Gerir contactos da conta",
        accountSettings: "Definições da conta",
        accountSettingsMessage: "Gerir definições relativas à conta",
        primaryContactType: "Tipo de Contacto Preferido",
        connectedAccounts: "Contas Conectadas",
        connectedAccountsMessage: "Gerir opções de Contas Conectadas",
        userRoles: "Perfis do Utilizador",
        userRolesMessage: "O Perfil do Utilizador define os seus acessos às diferentes funcionalidades da aplicação",
        userRolesAlert: "Atenção à alteração do Perfil do Utilizador: o mesmo pode perder ou ganhar acessos a diferentes funcionalidades da aplicação",
        currentUserRole: "Actual Perfil do Utilizador",
        changeUserRole: "Alterar Perfil do Utilizador",
        security: "Segurança",
        securityMessage: "Altere abaixo as suas preferências de segurança",
        changePassword: "Alterar Palavra-passe",
        changePasswordMessage: "Irás receber um email com instruções de como alterar a palavra-passe",
        name: "Nome",
        userName: "Username",
        email: "Email do Utilizador",
        phone: "Nº de Contacto do Utilizador",
        association: "Associação/Entidade do Utilizador",
        active: "Utilizador Activado",
        verified: "Utilizador Verificado",
        createdAt: "Registado em",
        updatedAt: "Actualizado em",
        saveButton: "Guardar",
        edit: "Editar",
        cancelButton: "Cancelar"
    },
    MESSAGES: {
        nameTooBig: "O Nome é demasiado grande. Máx. de caracteres: {{max}}",
        nameRequired: "O Nome da Aplicação é obrigatório",
        usernameTooBig: "O Username é demasiado grande. Máx. de caracteres: {{max}}",
        usernameRequired: "O Username é obrigatório",
        emailTooBig: "O Email do Utilizador é demasiado grande. Máx. de caracteres: {{max}}",
        emailRequired: "O Email do Utilizador é obrigatório",
        emailInvalid: "O Email do Utilizador deverá ser um endereço de email válido",
        phoneNumberTooBig: "O Número de Contacto é demasiado grande. Máx. de caracteres: {{max}}",
        userUpdatedSuccessfully: "A aplicação cliente cujo nome é {{userName}} foi atualizada com sucesso",
        userCreatedSuccessfully: "A aplicação cliente cujo nome é {{userName}} foi registada com sucesso",
        userGeneralError: "Erro ao registar/atualizar a aplicação cliente cujo nome é {{userName}}. Por favor tente novamente",
        userNotFound: "A aplicação cliente cujo nome é {{userName}} não foi encontrada. Por favor verifica se o nome está correcto",
        passwordResetSuccess: "Irás receber um email com instruções de como alterar a palavra-passe"
    }
} as const);