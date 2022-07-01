import * as deepFreeze from 'deep-freeze';

export const BANNERDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        bannerDetails: "Banner Details - {{name}}",
        bannerCreate: "Register a New Banner",
        bannerCreateSmall: "Register New Banner",
        bannerIdentificationSmall: "Banner: {{bannerIdentification}}",
        goBack: "Go back",
        registerBannerInfo: "The editting visual is not precisely the visual the final user will see",
        bannerWarning: "Careful editting page key and component key: the banner could stop working on the page where it is currently defined for"
    },
    LIST: {
        bannersTitle: "Banners",
        home: "Home",
        cms: "Website Content",
        banners: 'Banners',
        bannersTitleRoot: "Banners at root",
        bannersTitleSubPath: "Banners sub path {{bannersLevel}}",
        bannersSubPathLevel: "Level {{levelNumber}}",
        bannersSortedPosition: "Sorted position: {{positionNumber}}"
    },
    TABS: {
        main: "Banner Data",
        relatedBanners: "Related List"
    },
    FORM: {
        language: "Language",
        selectLanguage: "Banner Language: the editting below corresponds to the selected language",
        editorPlaceholder: "Start writting here, the edit options will appear...",
        isActive: "Active",
        DataBlocksJson: "Content of the Banner",
        pageKey: "Page Key Identifier",
        componentKey: "Component Key Identifier",
        orderPosition: "Position Order of the Banner",
        createdAt: "Registered At",
        updatedAt: "Updated at",
        saveButton: "Save"
    },
    MESSAGES: {
        pageKeyTooBig: "Page key is too big. Max characters: {{max}}",
        pageKeyRequired: "Page key is required",
        componentKeyTooBig: "Component key is too big. Max characters: {{max}}",
        componentKeyRequired: "Component key is required",
        orderPositionTooBig: "The order position of the banner is too big. Max value is: {{max}}",
        orderPositionRequired: "The order position of the banner is required",
        orderPositionMustBePositive: "The order position must be equal to 0 or higher",
        bannerUpdatedSuccessfully: "The Banner with identification {{bannerIdentification}} was updated successfully",
        bannerCreatedSuccessfully: "The Banner with identification {{bannerIdentification}} was created successfully",
        bannerGeneralError: "Error creating/updating Banner with identification {{bannerIdentification}}. Please try again",
        bannerNotFound: "The Banner with identification {{bannerIdentification}} wasn't found. Please double check if the identification is correct",
        bannerDuplicateFound: "A Banner with the same ordered position {{orderPosition}} already exists. Please change it before save it"
    }
} as const);