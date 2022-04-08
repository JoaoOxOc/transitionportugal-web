import * as deepFreeze from 'deep-freeze';
export var USERDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        userCreate: "Registar Novo Utilizador",
        userDetails: "Detalhes do Utilizador - {{name}}",
        clientAppCreate: "Registar Nova Autorização de Aplicação Cliente",
        clientAppCreateSmall: "Registar Nova Aplicação Cliente",
        goBack: "Voltar",
        registerClientAppInfo: "A chave da aplicação cliente será gerada automaticamente após o registo",
        clientAppWarning: "Atenção à edição dos valores de ID e chave: a aplicação cliente pode deixar de funcionar"
    },
    LIST: {
        clientsTitle: "Aplicações Clientes",
        home: "Home",
        settings: "Definições",
        clients: 'Aplicações Clientes'
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
//# sourceMappingURL=UserDetails.js.map