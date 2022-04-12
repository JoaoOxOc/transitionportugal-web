import * as deepFreeze from 'deep-freeze';

export const ASSOCIATIONDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        associationDetails: "Association Details - {{name}}",
        associationCreate: "Register a New Association/Entity",
        associationCreateSmall: "Register New Association/Entity",
        goBack: "Go back",
        registerAssociationInfo: "The client app Secret will be automatically generated after registering it",
        associationWarning: "Careful editting ID and secret values: the client app can stop working"
    },
    LIST: {
        associationsTitle: "Associations/Entities",
        home: "Home",
        management: "Management",
        associations: 'Associations'
    },
    TABS: {
        main: "General Info",
        address: "Association Address",
        users: "Association Users"
    },
    FORM: {
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
        associationUpdatedSuccessfully: "The Association with name {{associationName}} was updated successfully",
        associationCreatedSuccessfully: "The Association with name {{associationName}} was created successfully",
        associationGeneralError: "Error creating/updating Association with name {{associationName}}. Please try again",
        associationNotFound: "The Association with name {{associationName}} wasn't found. Please double check if the name is correct"
    }
} as const);