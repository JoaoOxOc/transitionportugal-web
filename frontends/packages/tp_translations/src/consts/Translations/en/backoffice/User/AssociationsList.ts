import * as deepFreeze from 'deep-freeze';

export const ASSOCIATIONSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createAssociation: "Register New Association",
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        associationsManagement: "Associations Management",
        noClientsFound: "We couldn't find any client apps matching your search criteria",
        chooseGrid: "Choose between table or grid views for displaying the users list.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing"
    },
    LIST: {
        clientsTitle: "Client Apps"
    },
    CLIENTOBJECT: {
        description: "Description",
        name: "Client Name",
        clientId: "Client App ID",
        clientSecret: "Client App Secret",
        createdAt: "Registered At",
        updatedAt: "Updated at"
    },
    MESSAGES: {
        associationsManagementDescription: "All aspects related to associations/entities can be managed from this page"
    },
    SEARCH: {
        searchByNameOrEmailPlaceholder: "Search by Name or Email..."
    }
} as const);