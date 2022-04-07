import * as deepFreeze from 'deep-freeze';

export const USERSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createUser: "Register New User",
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        UsersManagement: "Users Management",
        noUsersFound: "We couldn't find any users matching your search criterias",
        chooseGrid: "Choose between table or grid views for displaying the users list.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing"
    },
    LIST: {
        usersTitle: "Users"
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