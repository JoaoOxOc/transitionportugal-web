import * as deepFreeze from 'deep-freeze';

export const TERMSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createTerms: "New Terms & Conditions Record",
        actions: "Actions",
        view: "View",
        clone: "Clone",
        activate: "Activate",
        activateButton: "Activate",
        cloneButton: "Clone",
        cancelButton: "Cancel",
        actualValue: "Actual Value",
        termsManagement: "Policy & Privacy Management",
        noTermsFound: "We couldn't find any Terms & Conditions records matching your search criteria",
        chooseGrid: "Choose between table or grid views for displaying the Terms & Conditions records list.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing"
    },
    LIST: {
        termsTitle: "Terms & Conditions"
    },
    TERMSOBJECT: {
        version: "Terms & Conditions Version",
        versionSmall: "Version {{versionNumber}}",
        isActive: "Active",
        DataBlocksJson: "Terms & Conditions Content",
        createdAt: "Registered At",
        updatedAt: "Updated at"
    },
    MESSAGES: {
        termsDescription: "All aspects related to Policy & Privacy can be managed from this page",
        activateTermsInfo: "You will activate the version {{version}}. Please be aware that the final user will see this new Terms & Conditions version",
        cloneTermsInfo: "You will clone the version {{version}}. A new Terms & Conditions record with a new version will be created with the current version content",
        termsVersionCloned: "New Terms & Conditions version created: version {{version}}",
        termsCloningError: "An error occured while cloning the Terms & Conditions version {{version}}. Please try again. If problem persists, please contact sys admin",
        termsVersionActivated: "New Terms & Conditions version activated: version {{version}}",
        termsActivatingError: "An error occured while activating the Terms & Conditions version {{version}}. Please try again. If problem persists, please contact sys admin",
    },
    SEARCH: {
        filters: "Filters",
        searchByNamePlaceholder: "Search by Profile Name...",
        searchActive: "Activated Terms & Conditions",
    }
} as const);