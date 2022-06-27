import * as deepFreeze from 'deep-freeze';
export var BANNERDETAILS_TRANSLATIONS = deepFreeze({
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
        nameTooBig: "Name is too big. Max characters: {{max}}",
        nameRequired: "Client App Name is required",
        descriptionTooBig: "Description is too big. Max characters: {{max}}",
        descriptionRequired: "Client App Description is required",
        clientIdTooBig: "Client App ID is too big. Max characters: {{max}}",
        clientIdRequired: "Client App ID is required",
        emailInvalid: "Association email must be a valid email address",
        bannerUpdatedSuccessfully: "The Banner with identification {{bannerIdentification}} was updated successfully",
        bannerCreatedSuccessfully: "The Banner with identification {{bannerIdentification}} was created successfully",
        associationGeneralError: "Error creating/updating Banner with identification {{bannerIdentification}}. Please try again",
        bannerNotFound: "The Banner with identification {{bannerIdentification}} wasn't found. Please double check if the identification is correct"
    }
});
//# sourceMappingURL=bannerDetails.js.map