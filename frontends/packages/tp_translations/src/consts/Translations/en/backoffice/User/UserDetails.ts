import * as deepFreeze from 'deep-freeze';

export const USERDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        userCreate: "Regist a New User",
        userDetails: "User Details - {{name}}",
        userCreateSmall: "Register New User",
        goBack: "Go back",
        accountStatus: "Account status",
        active: "Active",
        inactive: "Inactive",
        accountEmailVerified: "Email Verified",
        emailVerified: "Verified",
        emailNotVerified: "Not Verified",
        userRole: "User role: {{name}}",
        registerUserInfo: "The client app Secret will be automatically generated after registering it",
        userWarning: "Careful editting ID and secret values: the client app can stop working"
    },
    LIST: {
        usersTitle: "Users",
        home: "Home",
        management: "Management",
        users: 'Users'
    },
    FORM: {
        name: "Name",
        userName: "Username",
        email: "User Email",
        association: "User Association/Entity",
        active: "User Activated",
        verified: "User Verified",
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