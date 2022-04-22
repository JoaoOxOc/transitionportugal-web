import * as deepFreeze from 'deep-freeze';
export var TERMSDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        termsDetails: "Terms & Conditions - {{name}}",
        termsCreate: "Register a Terms & Conditions Record",
        versionSmall: "Version {{versionNumber}}",
        termsCreateSmall: "New Terms & Conditions Record",
        goBack: "Go back",
        registerTermsInfo: "The editting visual is not precisely the visual the final user will see",
        termsBeenActiveWarning: "This Terms & Conditions version is/was active. Clone it to edit it",
        termsWarning: "Careful setting this record as active: the users will consent with this new version of Terms & Conditions"
    },
    LIST: {
        termsTitle: "Terms & Conditions",
        home: "Home",
        management: "Administration",
        terms: 'Terms & Conditions'
    },
    FORM: {
        description: "Description",
        language: "Language",
        selectLanguage: "Terms & Conditions Language: the editting below corresponds to the selected language",
        version: "Version",
        isActive: "Active",
        DataBlocksJson: "Content of the Terms & Conditions",
        updatedAt: "Updated At",
        createdAt: "Registered At",
        editorPlaceholder: "Start writting here, the edit options will appear...",
        saveButton: "Save"
    },
    MESSAGES: {
        descriptionTooBig: "Name is too big. Max characters: {{max}}",
        descriptionRequired: "Profile Name is required",
        termsUpdatedSuccessfully: "The Terms & Conditions version {{termsName}} was updated successfully",
        termsCreatedSuccessfully: "The Terms & Conditions version {{termsName}} was created successfully",
        termsGeneralError: "Error creating/updating Terms & Conditions version {{termsName}}. Please try again",
        termsNotFound: "The Terms & Conditions version {{termsName}} wasn't found. Please double check if the version is correct",
        termsLockedForEdition: "The Terms & Conditions version {{termsName}} are locked for edition - this version is/was active in the past. Clone it to edit it",
    }
});
//# sourceMappingURL=TermsDetails.js.map