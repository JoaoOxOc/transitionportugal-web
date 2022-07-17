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
        deactivate: "Deactivate",
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
        bannersListIdentificationSmall: "Banners List: {{bannerIdentification}}",
    },
    LIST: {
        bannersTitle: "Public Website Banners",
        home: "Home",
        cms: "Website Content",
        bannersTitleRoot: "Banners at root",
        bannersTitleSubPath: "Banners sub path {{bannersLevel}}",
        bannersSubPathLevel: "Level {{levelNumber}}",
        bannersSortedPosition: "Sorted position: {{positionNumber}}"
    },
    BANNEROBJECT: {
        pageKey: "Page Key Identifier",
        componentKey: "Page Component Key Identifier",
        orderPosition: "Page Component Order Position",
        isActive: "Active",
        DataBlocksJson: "Banner Content",
        hierarchyTree: "Banner Hierarchy Tree",
        hierarchyTreeInfo: "Access the List ofChild Elements related to this Banner",
        parentBanner: "Has Parent Banner",
        bannerParentPath: "Go Back to Parent Banner",
        createdAt: "Registered At",
        updatedAt: "Updated at"
    },
    MESSAGES: {
        bannersManagementDescription: "All aspects related to banners can be managed from this page",
        bannersNotFound: "The selected banner(s) weren't found",
        bannerCloned: "New Banner created: {{bannerIdentification}}",
        activateBannerInfo: "You will activate the banner with identification {{bannerIdentification}}. Please be aware that the final user will see this banner in the corresponding page key and component key",
        deactivateBannerInfo: "You will activate the banner with identification {{bannerIdentification}}. Please be aware that the final user will not see this banner anymore in the corresponding page key and component key",
        cloneBannerInfo: "You will clone the banner with identification {{bannerIdentification}}. A new banner record with a new order position will be created with the current selected banner content",
        bannersActivated: "The selected banner(s) are now activated",
        bannersDeactivated: "The selected banner(s) are now deactivated",
        activatingErrors: "Some selected banner(s) weren't activated. Please try again. If problem persists, please contact sys admin",
        deactivatingErrors: "Some selected banner(s) weren't deactivated. Please try again. If problem persists, please contact sys admin",
        bannersDeleted: "The selected banner(s) were deleted",
        deletingErrors: "Some selected banner(s) weren't deleted. Please try again",
        bannerCloningError: "An error occured while cloning the Banner with identification {{bannerIdentification}}. Please try again. If problem persists, please contact sys admin",
        bannerActivatingError: "An error occured while activating the Banner with identification {{bannerIdentification}}. Please try again. If problem persists, please contact sys admin",
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