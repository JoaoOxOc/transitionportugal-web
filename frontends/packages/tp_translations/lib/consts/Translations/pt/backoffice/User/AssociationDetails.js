import * as deepFreeze from 'deep-freeze';
export var ASSOCIATIONDETAILS_TRANSLATIONS = deepFreeze({
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
        management: "Administração",
        associations: 'Associações'
    },
    FORM: {
        description: "Descrição",
        name: "Nome da Associação",
        email: "Email da Associação",
        active: "Activada",
        verified: "Verificou o Email",
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
//# sourceMappingURL=AssociationDetails.js.map