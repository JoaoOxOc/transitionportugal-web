import * as deepFreeze from 'deep-freeze';

export const EMAILTEMPLATESLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createTemplate: "Register New Email Template",
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        emailTemplatesManagement: "Email Templates Management",
        noEmailTemplatesFound: "We couldn't find any email templates matching your search criteria",
        chooseGrid: "Choose between table or grid views for displaying the email templates list.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing"
    },
    LIST: {
        templatesTitle: "Email Templates"
    },
    TEMPLATEOBJECT: {
        description: "Template Description",
        subject: "Email Subject",
        key: "Template Key",
        language: "Template Language",
        createdAt: "Registered At",
        updatedAt: "Updated at"
    },
    MESSAGES: {
        templatesManagementDescription: "All aspects related to email templates can be managed from this page"
    },
    SEARCH: {
        searchByNamePlaceholder: "Search by Key, Description or Email Subject..."
    }
} as const);