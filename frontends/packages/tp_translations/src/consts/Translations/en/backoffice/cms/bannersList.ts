import * as deepFreeze from 'deep-freeze';

export const BANNERSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createBanner: "Register New Banner",
        actions: "Actions",
        view: "View",
        clone: "Clone",
        activate: "Activate",
        activateButton: "Activate",
        deactivateButton: "Deactivate",
        cloneButton: "Clone",
        cancelButton: "Cancel",
        deleteButton: "Delete",
        actualValue: "Actual Value",
        bannersManagement: "Banners Management",
        noBannersFound: "We couldn't find any bannerss matching your search criteria",
        chooseGrid: "Choose between table or grid views for displaying the banners list.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing",
        selectAll: "Select all Bannerss",
    },
    LIST: {
        bannersTitle: "Public Website Banners"
    },
    BANNEROBJECT: {
        pageKey: "Page Key Identifier",
        componentKey: "Page Component Key Identifier",
        orderPosition: "Page Component Order Position",
        isActive: "Active",
        DataBlocksJson: "Banner Content",
        createdAt: "Registered At",
        updatedAt: "Updated at"
    },
    MESSAGES: {
        bannersManagementDescription: "All aspects related to banners can be managed from this page",
        bannersNotFound: "The selected banner(s) weren't found",
        bannerCloned: "New Banner created: {{bannerIdentification}}",
        bannersActivated: "The selected banner(s) are now activated",
        bannersDeactivated: "The selected banner(s) are now deactivated",
        activatingErrors: "Some selected banner(s) weren't activated. Please try again",
        deactivatingErrors: "Some selected banner(s) weren't deactivated. Please try again",
        bannersDeleted: "The selected banner(s) were deleted",
        deletingErrors: "Some selected banner(s) weren't deleted. Please try again"
    },
    SEARCH: {
        filters: "Filters",
        searchByNameOrEmailPlaceholder: "Search by Page Key or Component Key identifier...",
        searchActive: "Activated Banners",
        searchInactive: "Deactivated Banners"
    },
    ACTIONS: {
        activateBanners: "Activate Banners",
        deleteBanners: "Delete selected Banners(s)",
        cloneBannerSingle: "Clone this Banner",
        activateBannerSingle: "Activate this Banner",
        deleteBannerSingle: "Delete this Banners"
    }
} as const);