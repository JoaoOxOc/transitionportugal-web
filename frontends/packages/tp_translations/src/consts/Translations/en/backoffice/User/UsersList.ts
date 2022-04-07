import * as deepFreeze from 'deep-freeze';

export const USERSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createUser: "Register New User",
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        UsersManagement: "Users Management",
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
        usersManagementDescription: "All aspects related to the app users can be managed from this page"
    },
    SEARCH: {
        searchByNameOrEmailPlaceholder: "Search by Username or Email..."
    }
} as const);