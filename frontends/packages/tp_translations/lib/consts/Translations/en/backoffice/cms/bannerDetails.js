import * as deepFreeze from 'deep-freeze';
export var BANNERDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        bannerDetails: "Banner Details - {{name}}",
        bannerCreate: "Register a New Banner",
        bannerCreateSmall: "Register New Banner",
        bannerIdentificationSmall: "Banner: {{bannerIdentification}}",
        goBack: "Go back",
        registerBannerInfo: "The client app Secret will be automatically generated after registering it",
        bannerWarning: "Careful editting ID and secret values: the client app can stop working"
    },
    LIST: {
        bannersTitle: "Banners",
        home: "Home",
        cms: "Website Content",
        banners: 'Banners'
    },
    TABS: {
        relatedBanners: "Related List"
    },
    FORM: {
        language: "Language",
        selectLanguage: "Banner Language: the editting below corresponds to the selected language",
        editorPlaceholder: "Start writting here, the edit options will appear...",
        isActive: "Active",
        DataBlocksJson: "Content of the Banner",
        description: "Description",
        name: "Association Name",
        email: "Association Email",
        phone: "Association Phone",
        streetAddress: "Street Address",
        town: "Association Town",
        postalCode: "Association Postal Code",
        vat: "Association VAT",
        logoImage: "Association Logo",
        website: "Association Website",
        tags: "Association Tags",
        active: "Is activated",
        verified: "Verified by Email",
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