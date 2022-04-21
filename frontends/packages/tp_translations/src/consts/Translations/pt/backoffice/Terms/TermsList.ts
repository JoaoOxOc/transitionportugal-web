import * as deepFreeze from 'deep-freeze';

export const TERMSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createTerms: "Novo registo de Termos & Condições",
        actions: "Ações",
        view: "Visualizar",
        actualValue: "Valor Actual",
        termsManagement: "Gestão de Política & Privacidade",
        noTermsFound: "Não foi possível encontrar nenhum registo de Termos & Condições de acordo com os critérios de pesquisa definidos",
        chooseGrid: "Escolha entre as vistas de tabela ou grelha para apresentar a lista de registos de Termos & Condições.",
        ofSmall: "de",
        paginationRowsPerPage: "Linhas por pág.:",
        showing: "Mostrando"
    },
    LIST: {
        termsTitle: "Termos & Condições"
    },
    TERMSOBJECT: {
        version: "Versão dos Termos & Condições",
        versionSmall: "Versão {{versionNumber}}",
        isActive: "Activo",
        DataBlocksJson: "Conteúdo dos Termos & Condições",
        createdAt: "Registado em",
        updatedAt: "Actualizado em"
    },
    MESSAGES: {
        termsDescription: "Todos os aspectos relativos a Política & Privacidade podem ser geridos nesta página"
    },
    SEARCH: {
        filters: "Filtros",
        searchByNamePlaceholder: "Pesquisar por Nome do Perfil...",
        searchActive: "Termos & Condições Activos",
    }
} as const);