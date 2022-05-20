import * as deepFreeze from 'deep-freeze';

export const TERMSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createTerms: "Novo registo de Termos & Condições",
        actions: "Ações",
        view: "Visualizar",
        clone: "Clonar",
        activate: "Activar",
        activateButton: "Activar",
        cloneButton: "Clonar",
        cancelButton: "Cancelar",
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
        termsDescription: "Todos os aspectos relativos a Política & Privacidade podem ser geridos nesta página",
        activateTermsInfo: "Irá activar a versão {{version}}. Por favor tenha em mente que o utilizador final irá visualizar esta nova versão dos Termos & Condições",
        cloneTermsInfo: "Irá clonar a versão {{version}}. Um novo registo de Termos & Condições com uma nova versão vai ser criado com o conteúdo da versão que selecionou para clonar",
        termsVersionCloned: "Nova versão de Termos & Condições criada: versão {{version}}",
        termsCloningError: "Ocorreu um erro ao clonar os Termos & Condições versão {{version}}. Por favor tente novamente. Se o problema persistir, por favor contacte o administrador do sistema",
        termsVersionActivated: "Versão de Termos & Condições activada: versão {{version}}",
        termsActivatingError: "Ocorreu um erro ao activar os Termos & Condições versão {{version}}. Por favor tente novamente. Se o problema persistir, por favor contacte o administrador do sistema",
    },
    SEARCH: {
        filters: "Filtros",
        searchByNamePlaceholder: "Pesquisar por Nome do Perfil...",
        searchActive: "Termos & Condições Activos",
    }
} as const);