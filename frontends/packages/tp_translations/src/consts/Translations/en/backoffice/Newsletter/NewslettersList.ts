import * as deepFreeze from 'deep-freeze';

export const NEWSLETTERSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createNewsletterSubscription: "Register New Newsletter Subscription",
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        newsletterSubscriptionsManagement: "Newsletter Subscriptions Management (Integrated with Mailchimp)",
        noNewsletterSubscriptionsFound: "We couldn't find any Newsletter Subscriptions matching your search criteria",
        mailingListNotFound: "The Mailing List with the inserted name doesn't exist",
        chooseGrid: "Choose between table or grid views for displaying the Newsletter Subscriptions.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing"
    },
    LIST: {
        newsletterSubscriptionsTitle: "Newsletter Subscriptions"
    },
    NEWSLETTEROBJECT: {
        description: "Description",
        email: "Email Address",
        name: "Client Name",
        tags: "Tags",
        clientSecret: "Client App Secret",
        createdAt: "Registered At",
        updatedAt: "Updated at"
    },
    MESSAGES: {
        newsletterSubscriptionsDescription: "All aspects related to Newsletter Subscriptions registered on Mailchimp can be managed from this page. Start by selecting a mailing list to display it's members (subscriptions)"
    },
    SEARCH: {
        filters: "Filters",
        searchByMailingList: "Select the Mailing List by name...",
        searchByNamePlaceholder: "Search by Key, Description or Email Subject..."
    }
} as const);