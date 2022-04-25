import * as deepFreeze from 'deep-freeze';

export const EMAILTEMPLATESLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createTemplate: "Registar Template de Email",
        actions: "Ações",
        view: "Visualizar",
        actualValue: "Valor Actual",
        emailTemplatesManagement: "Gestão dos Templates de Email",
        noEmailTemplatesFound: "Não foi possível encontrar nenhum template de email de acordo com os critérios de pesquisa definidos",
        chooseGrid: "Escolha entre as vistas de tabela ou grelha para apresentar a lista de templates de email.",
        ofSmall: "de",
        paginationRowsPerPage: "Linhas por pág.:",
        showing: "Mostrando"
    },
    LIST: {
        templatesTitle: "Templates de Email"
    },
    TEMPLATEOBJECT: {
        description: "Description",
        name: "Nome da Aplicação Cliente",
        clientId: "ID da Aplicação Cliente",
        clientSecret: "Chave da Aplicação Cliente",
        createdAt: "Registado em",
        updatedAt: "Actualizado em"
    },
    MESSAGES: {
        templatesManagementDescription: "Todos os aspectos relativos aos templates de email podem ser geridos nesta página"
    },
    SEARCH: {
        searchByNamePlaceholder: "Pesquisar por Chave, Descrição ou Assunto do template de Email..."
    }
} as const);