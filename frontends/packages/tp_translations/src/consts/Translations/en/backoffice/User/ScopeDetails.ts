import * as deepFreeze from 'deep-freeze';

export const SCOPEDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        scopeCreate: "Register New Permission",
        scopeDetails: "Permission Details - {{name}}",
        associationCreateSmall: "Register New Permission",
        goBack: "Go back",
        registerScopeInfo: "You must associate the permission with a profile in order for it to be attributed to a user",
        scopeWarning: "Careful editting Identifier: the users may lost app access to certain features"
    },
    LIST: {
        scopesTitle: "Permissions",
        home: "Home",
        management: "Management",
        scopes: 'Permissions'
    },
    FORM: {
        name: "Client App Name",
        description: "Client App Description",
        clientId: "Client App ID",
        scopeRoles: "Profiles related to this Permission",
        updatedAt: "Updated At",
        createdAt: "Registered At",
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