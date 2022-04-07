import * as deepFreeze from 'deep-freeze';

export const ROLEDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        createClientApp: "Register Client App",
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        clientSettings: "Client Apps Authorized Management",
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
        clientsDescription: "All aspects related to client apps authorized can be managed from this page"
    },
    SEARCH: {
        searchByNamePlaceholder: "Search by Name or Client App Id..."
    }
} as const);