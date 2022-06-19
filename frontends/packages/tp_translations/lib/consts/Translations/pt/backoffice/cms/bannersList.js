import * as deepFreeze from 'deep-freeze';
export var BANNERSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createBanner: "Registar Novo Banner",
        actions: "Ações",
        view: "Visualizar",
        clone: "Clonar",
        activate: "Activar",
        activateButton: "Activar",
        deactivateButton: "Desactivar",
        cloneButton: "Clonar",
        cancelButton: "Cancelar",
        deleteButton: "Eliminar",
        actualValue: "Valor Actual",
        bannersManagement: "Gestão dos Banners",
        noBannersFound: "Não foi possível encontrar nenhum Banner de acordo com os critérios de pesquisa definidos",
        chooseGrid: "Escolha entre as vistas de tabela ou grelha para apresentar a lista de dados de Banners.",
        ofSmall: "de",
        paginationRowsPerPage: "Linhas por pág.:",
        showing: "Mostrando",
        selectAll: "Seleccionar todos os Banners"
    },
    LIST: {
        bannersTitle: "Banners no Website Público"
    },
    BANNEROBJECT: {
        pageKey: "Identificador Chave da Página",
        componentKey: "Identificador Chave do Componente na Página",
        orderPosition: "Posição Ordenada do Banner no Componente",
        isActive: "Activo",
        DataBlocksJson: "Conteúdo do Banner",
        createdAt: "Registado em",
        updatedAt: "Actualizado em"
    },
    MESSAGES: {
        bannersManagementDescription: "Todos os aspectos relativos aos banners podem ser geridos nesta página",
        bannersNotFound: "O(s) banner(s) seleccionado(s) não foi/foram encontrado(s)",
        bannerCloned: "Novo Banner criado: {{bannerIdentification}}",
        activateBannerInfo: "Irá activar o banner cuja identificação é {{bannerIdentification}}. Por favor tenha em atenção que o utilizador final irá ver este banner na página e componente correspondentes às chaves de identificação",
        deactivateBannerInfo: "Irá desactivar o banner cuja identificação é {{bannerIdentification}}. Por favor tenha em atenção que o utilizador final irá deixar de ver este banner na página e componente correspondentes às chaves de identificação",
        cloneBannerInfo: "Irá clonar o banner cuja identificação é {{bannerIdentification}}. Um novo registo de banner com uma nova posição de ordenação será criado com o conteúdo do banner actualmente seleccionado",
        bannersActivated: "O(s) banner(s) seleccionado(s) está/estão agora activo(s)",
        bannersDeactivated: "O(s) banner(s) seleccionado(s) está/estão agora inactivo(s)",
        activatingErrors: "O/alguns banner(s) seleccionado(s) não foi/foram activado(s). Por favor tente novamente",
        deactivatingErrors: "O/alguns banner(s) seleccionado(s) não foi/foram inactivado(s). Por favor tente novamente",
        bannersDeleted: "O(s) banner(s) seleccionado(s) foi/foram removido(s)",
        deletingErrors: "O/alguns banner(s) seleccionado(s) não foi/foram eliminado(s). Por favor tente novamente",
        bannerCloningError: "Ocorreu um erro ao clonar o Banner cuja identificação é {{bannerIdentification}}. Por favor tente novamente. Se o problema persistir, contacte-te o administrador da plataforma",
        bannerActivatingError: "Ocorreu um erro ao activar o Banner cuja identificação é {{bannerIdentification}}. Por favor tente novamente. Se o problema persistir, contacte-te o administrador da plataforma",
    },
    SEARCH: {
        filters: "Filtros",
        searchByNameOrEmailPlaceholder: "Pesquisar por Chave de Identificação da Página ou do Componente...",
        searchActive: "Banners Activos",
        searchInactive: "Banners Inactivos"
    },
    ACTIONS: {
        activateBanners: "Activar Banners",
        deleteBanners: "Remover banner(s) seleccionado(s)",
        cloneBannerSingle: "Clonar este Banner",
        activateBannerSingle: "Activar este Banner",
        deleteBannerSingle: "Remover esta Banner"
    }
});
//# sourceMappingURL=bannersList.js.map