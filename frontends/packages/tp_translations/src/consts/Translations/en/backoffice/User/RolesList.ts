import * as deepFreeze from 'deep-freeze';

export const ROLESLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createRole: "Register new Profile",
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        rolesManagement: "Profiles Management",
        noRolesFound: "We couldn't find any profiles matching your search criteria",
        chooseGrid: "Choose between table or grid views for displaying the profiles list.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing"
    },
    LIST: {
        rolesTitle: "Profiles"
    },
    ROLEOBJECT: {
        name: "Profile Name",
        normalizedRoleName: "Capital Profile Name",
        createdAt: "Registered At",
        updatedAt: "Updated at"
    },
    MESSAGES: {
        rolesDescription: "All aspects related to users profiles can be managed from this page"
    },
    SEARCH: {
        searchByNamePlaceholder: "Search by Profile Name..."
    }
} as const);