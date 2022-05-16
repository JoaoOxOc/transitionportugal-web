import * as deepFreeze from 'deep-freeze';

export const NEWSLETTERSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createNewsletterSubscription: "Registar Nova Subscrição de Newsletter",
        actions: "Ações",
        view: "Visualizar",
        actualValue: "Valor Actual",
        newsletterSubscriptionsManagement: "Gestão das Subscrições de Newsletter (Integrado com o Mailchimp)",
        noNewsletterSubscriptionsFound: "Não foi possível encontrar nenhuma Subscrição de Newsletter de acordo com os critérios de pesquisa definidos",
        mailingListNotFound: "A Lista de Mailing com o nome inserido não existe",
        chooseGrid: "Escolha entre as vistas de tabela ou grelha para apresentar a listagem de Subscrições de Newsletter.",
        ofSmall: "de",
        paginationRowsPerPage: "Linhas por pág.:",
        showing: "Mostrando"
    },
    LIST: {
        newsletterSubscriptionsTitle: "Subscrições de Newsletter"
    },
    NEWSLETTEROBJECT: {
        description: "Descrição",
        email: "Endereço de Email",
        name: "Nome da Aplicação Cliente",
        tags: "Tags",
        clientSecret: "Chave da Aplicação Cliente",
        createdAt: "Registado em",
        updatedAt: "Actualizado em"
    },
    MESSAGES: {
        newsletterSubscriptionsDescription: "Todos os aspectos relativos às Subscrições de Newsletter podem ser geridos nesta página. Começa por selecionar uma lista de mailing por forma a apresentar os seus membros (subscrições)"
    },
    SEARCH: {
        filters: "Filtros",
        searchByMailingList: "Seleccione a Lista de Mailing",
        searchByNamePlaceholder: "Pesquisar por Nome ou Email do membro..."
    }
} as const);