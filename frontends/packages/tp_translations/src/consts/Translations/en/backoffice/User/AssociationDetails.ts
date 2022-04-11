import * as deepFreeze from 'deep-freeze';

export const ASSOCIATIONDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        associationDetails: "Client App Details - {{name}}",
        associationCreate: "Register a New Client App Authorization",
        associationCreateSmall: "Register New Client App",
        goBack: "Go back",
        registerAssociationInfo: "The client app Secret will be automatically generated after registering it",
        associationWarning: "Careful editting ID and secret values: the client app can stop working"
    },
    LIST: {
        associationsTitle: "Associations/Entities",
        home: "Home",
        settings: "Settings",
        associations: 'Associations'
    },
    FORM: {
        description: "Description",
        name: "Association Name",
        email: "Association Email",
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
        clientAppUpdatedSuccessfully: "The client app with name {{clientName}} was updated successfully",
        clientAppCreatedSuccessfully: "The client app with name {{clientName}} was created successfully",
        clientAppGeneralError: "Error creating/updating client app with name {{clientName}}. Please try again",
        clientAppNotFound: "The client app with name {{clientName}} wasn't found. Please double check if the name is correct"
    }
} as const);