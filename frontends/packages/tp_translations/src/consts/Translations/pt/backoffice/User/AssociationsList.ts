import * as deepFreeze from 'deep-freeze';

export const ASSOCIATIONSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createAssociation: "Registar Nova Associação/Entidade",
        actions: "Ações",
        view: "Visualizar",
        actualValue: "Valor Actual",
        associationsManagement: "Gestão das Associações/Entidades",
        noAssociationsFound: "Não foi possível encontrar nenhuma Associação/Entidade de acordo com os critérios de pesquisa definidos",
        chooseGrid: "Escolha entre as vistas de tabela ou grelha para apresentar a lista de dados de Associações/Entidades.",
        ofSmall: "de",
        paginationRowsPerPage: "Linhas por pág.:",
        showing: "Mostrando"
    },
    LIST: {
        associationsTitle: "Associações/Entidades"
    },
    ASSOCIATIONOBJECT: {
        description: "Descrição",
        name: "Nome da Associação",
        email: "Email da Associação",
        active: "Activada",
        verified: "Verificou o Email",
        createdAt: "Registado em",
        updatedAt: "Actualizado em"
    },
    MESSAGES: {
        associationsManagementDescription: "Todos os aspectos relativos às associações/entidades podem ser geridos nesta página"
    },
    SEARCH: {
        searchByNameOrEmailPlaceholder: "Pesquisar por Nome ou Email da associação..."
    }
} as const);