import * as deepFreeze from 'deep-freeze';

export const SCOPESLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createScope: "Register new Permission",
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        scopesManagement: "Permissions Management",
        noScopesFound: "We couldn't find any permissions matching your search criteria",
        chooseGrid: "Choose between table or grid views for displaying the permissions list.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing"
    },
    LIST: {
        scopesTitle: "Permissions"
    },
    SCOPEOBJECT: {
        description: "Description",
        name: "Identifier",
        createdAt: "Registered At",
        updatedAt: "Updated at"
    },
    MESSAGES: {
        scopesDescription: "All aspects related to user permissions (inside each user profile) can be managed from this page"
    },
    SEARCH: {
        searchByNamePlaceholder: "Search by Permission Identifier or Description..."
    }
} as const);