import * as deepFreeze from 'deep-freeze';

export const SCOPESLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createScope: "Registar Nova Permissão",
        actions: "Ações",
        view: "Visualizar",
        actualValue: "Valor Actual",
        scopesManagement: "Gestão das Permissões de Utilizadores",
        noScopesFound: "Não foi possível encontrar nenhuma permissão de acordo com os critérios de pesquisa definidos",
        chooseGrid: "Escolha entre as vistas de tabela ou grelha para apresentar a lista de permissões.",
        ofSmall: "de",
        paginationRowsPerPage: "Linhas por pág.:",
        showing: "Mostrando"
    },
    LIST: {
        scopesTitle: "Permissões"
    },
    SCOPEOBJECT: {
        description: "Descrição",
        name: "Identificador",
        createdAt: "Registado em",
        updatedAt: "Actualizado em"
    },
    MESSAGES: {
        scopesDescription: "Todos os aspectos relativos às permissões dos utilizadores (asssociadas a cada perfil de utilizador) podem ser geridos nesta página"
    },
    SEARCH: {
        searchByNamePlaceholder: "Pesquisar por Identificador ou Descrição..."
    }
} as const);