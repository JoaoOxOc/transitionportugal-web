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
    TABS: {
        main: "Edit Profile",
        security: "Password/Security"
    },
    ROLES: {
        associationAdmin: "Association Administrator",
        associationUser: "Association User",
        admin: "System Administrator",
        user: "System User"
    },
    FORM: {
        personalDetails: "Personal Details",
        personalDetailsMessage: "Manage informations related to personal details",
        accountContacts: "Contacts",
        accountContactsMessage: "Manage account contacts",
        accountSettings: "Account Settings",
        accountSettingsMessage: "Manage settings related to account",
        primaryContactType: "Main Contact Type",
        name: "Name",
        userName: "Username",
        email: "User Email",
        phone: "User Phone Number",
        association: "User Association/Entity",
        active: "User Activated",
        verified: "User Verified",
        createdAt: "Registered At",
        updatedAt: "Updated at",
        saveButton: "Save",
        edit: "Edit"
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