import * as deepFreeze from 'deep-freeze';
export var USERDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        userCreate: "Regist a New User",
        userDetails: "User Details - {{name}}",
        userCreateSmall: "Register New User",
        goBack: "Go back",
        view: "View Association",
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
        security: "Password/Security",
        roles: "User Profiles"
    },
    ROLES: {
        associationAdmin: "Association Administrator",
        associationUser: "Association User",
        admin: "System Administrator",
        user: "System User"
    },
    CONNECTED_ACCOUNTS: {
        discourse: "Discourse",
        discourseDescription: "Defines if you're connected to Transição Portugal Discourse app",
        connected: "Connected",
        disconnected: "Disconnected"
    },
    FORM: {
        personalDetails: "Personal Details",
        personalDetailsMessage: "Manage informations related to personal details",
        accountContacts: "Contacts",
        accountContactsMessage: "Manage account contacts",
        accountSettings: "Account Settings",
        accountSettingsMessage: "Manage settings related to account",
        primaryContactType: "Main Contact Type",
        connectedAccounts: "Connected Accounts",
        connectedAccountsMessage: "Manage connected accounts options",
        security: "Security",
        securityMessage: "Change your security preferences below",
        changePassword: "Change Password",
        changePasswordMessage: "You will receive an email with instructions on how to reset it",
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
        edit: "Edit",
        cancelButton: "Cancel"
    },
    MESSAGES: {
        nameTooBig: "Name is too big. Max characters: {{max}}",
        nameRequired: "Name is required",
        usernameTooBig: "Username is too big. Max characters: {{max}}",
        usernameRequired: "Username is required",
        emailTooBig: "User Email is too big. Max characters: {{max}}",
        emailRequired: "User Email is required",
        emailInvalid: "User email must be a valid email address",
        phoneNumberTooBig: "Phone number is too big. Max characters: {{max}}",
        userUpdatedSuccessfully: "The user with name {{userName}} was updated successfully",
        userCreatedSuccessfully: "The user with name {{userName}} was created successfully",
        userGeneralError: "Error creating/updating user with name {{userName}}. Please try again",
        userNotFound: "The user with name {{userName}} wasn't found. Please double check if the name is correct",
        passwordResetSuccess: "You will receive an email with instructions on how to reset the password"
    }
});
//# sourceMappingURL=UserDetails.js.map