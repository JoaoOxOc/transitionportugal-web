import * as deepFreeze from 'deep-freeze';

export const ASSOCIATIONSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createAssociation: "Register New Association",
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        associationsManagement: "Associations Management",
        noAssociationsFound: "We couldn't find any associations matching your search criteria",
        chooseGrid: "Choose between table or grid views for displaying the associations list.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing"
    },
    LIST: {
        associationsTitle: "Associations/Entities"
    },
    ASSOCIATIONOBJECT: {
        description: "Description",
        name: "Association Name",
        email: "Association Email",
        active: "Is activated",
        verified: "Verified by Email",
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