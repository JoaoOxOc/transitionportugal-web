import * as deepFreeze from 'deep-freeze';

export const TERMSDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        termsDetails: "Terms & Conditions - {{name}}",
        termsCreate: "Register a Terms & Conditions Record",
        termsCreateSmall: "New Terms & Conditions Record",
        goBack: "Go back",
        registerTermsInfo: "The editting visual is not precisely the visual the final user will see",
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
        isActive: "Activated",
        DataBlocksJson: "Content of the Terms & Conditions",
        updatedAt: "Updated At",
        createdAt: "Registered At",
        saveButton: "Save"
    },
    MESSAGES: {
        descriptionTooBig: "Name is too big. Max characters: {{max}}",
        descriptionRequired: "Profile Name is required",
        roleUpdatedSuccessfully: "The Profile with name {{termsName}} was updated successfully",
        roleCreatedSuccessfully: "The Profile with name {{termsName}} was created successfully",
        roleGeneralError: "Error creating/updating Profile with name {{termsName}}. Please try again",
        roleNotFound: "The Profile with name {{termsName}} wasn't found. Please double check if the name is correct"
    }
} as const);