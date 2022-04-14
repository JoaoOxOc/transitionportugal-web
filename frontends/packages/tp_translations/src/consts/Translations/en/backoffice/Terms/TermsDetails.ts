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
        name: "Profile Name",
        normalizedRoleName: "Capital Profile Name",
        scopes: "Permissions related to this Profile",
        choices: "Permissions available",
        selected: "Permissions applied",
        updatedAt: "Updated At",
        createdAt: "Registered At",
        saveButton: "Save"
    },
    MESSAGES: {
        nameTooBig: "Name is too big. Max characters: {{max}}",
        nameRequired: "Profile Name is required",
        roleUpdatedSuccessfully: "The Profile with name {{roleName}} was updated successfully",
        roleCreatedSuccessfully: "The Profile with name {{roleName}} was created successfully",
        roleGeneralError: "Error creating/updating Profile with name {{roleName}}. Please try again",
        roleNotFound: "The Profile with name {{roleName}} wasn't found. Please double check if the name is correct"
    }
} as const);