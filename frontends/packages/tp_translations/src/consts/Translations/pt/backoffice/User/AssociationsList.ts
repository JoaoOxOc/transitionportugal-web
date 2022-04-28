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
        showing: "Mostrando",
        selectAll: "Seleccionar todas as Associações"
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
        associationsManagementDescription: "Todos os aspectos relativos às associações/entidades podem ser geridos nesta página",
        associationsNotFound: "A(s) associação(ões) seleccionada(s) não foi/foram encontrada(s)",
        resentErrors: "Alguns emails não foram enviados para a(s) associação(ões) seleccionada(s). Por favor tente novamente",
        resentEmails: "Email(s) de verificação reenviado(s) para a(s) associação(ões) seleccionada(s)",
        associationsApproved: "A(s) associação(ões) seleccionada(s) está/estão agora aprovada(s)/activa(s)",
        associationsRemoved: "A(s) associação(ões) seleccionada(s) foi/foram removida(s)",
        approvingErrors: "A/algumas associação(ões) seleccionada(s) não foi/foram aprovada(s). Por favor tente novamente",
        deleted: "A(s) associação(ões) seleccionada(s) foi/foram removida(s)",
        deletingErrors: "A/algumas associação(ões) seleccionada(s) não foi/foram eliminada(s). Por favor tente novamente"
    },
    SEARCH: {
        filters: "Filtros",
        searchByNameOrEmailPlaceholder: "Pesquisar por Nome ou Email da associação...",
        searchActive: "Associações Activadas",
        searchVerified: "Associações verificadas por Email"
    },
    ACTIONS: {
        resendVerifyEmail: "Reenviar Email de Verificação",
        approveAssociation: "Aprovar Associações/Entidades",
        delete: "Remover associação(ões) seleccionada(s)",
        resendVerifyEmailSingle: "Reenviar Email de Verificação",
        approveAssociationSingle: "Aprovar esta Associação",
        deleteSingle: "Remover esta Associação"
    }
} as const);