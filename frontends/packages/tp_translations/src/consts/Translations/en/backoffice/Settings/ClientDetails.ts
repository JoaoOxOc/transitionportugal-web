import * as deepFreeze from 'deep-freeze';

export const CLIENTDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        clientDetails: "Client App Details - {{name}}",
        clientAppCreate: "Register a New Client App Authorization",
        clientAppCreateSmall: "Register New Client App",
        goBack: "Go back",
        registerClientAppInfo: "The client app Secret will be automatically generated after registering it",
        clientAppWarning: "Careful editting ID and secret values: the client app can stop working"
    },
    LIST: {
        clientsTitle: "Client Apps",
        home: "Home",
        settings: "Settings",
        clients: 'Client Apps'
    },
    FORM: {
        name: "Client App Name",
        description: "Client App Description",
        clientId: "Client App ID",
        clientSecret: "Client App Secret",
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