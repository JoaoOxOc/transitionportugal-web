import * as deepFreeze from 'deep-freeze';

export const ROLEDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        roleDetails: "Profile Details - {{name}}",
        roleCreate: "Register a New Users Profile",
        roleCreateSmall: "Register New Profile",
        goBack: "Go back",
        registerRoleInfo: "You must associate permissions with this profile in order to give users app permissions with this profile",
        roleWarning: "Careful editting permissions: the users with this profile may lost or gain app access to certain features"
    },
    LIST: {
        rolesTitle: "Profiles",
        home: "Home",
        management: "Administration",
        roles: 'Profiles'
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