import * as deepFreeze from 'deep-freeze';
export var SCOPEDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        scopeCreate: "Register New Permission",
        scopeDetails: "Permission Details - {{name}}",
        associationCreateSmall: "Register New Permission",
        goBack: "Go back",
        registerScopeInfo: "You must associate the permission with a profile in order for it to be attributed to a user",
        scopeWarning: "Careful editting profiles: the users may lost or gain app access to certain features"
    },
    LIST: {
        scopesTitle: "Permissions",
        home: "Home",
        management: "Management",
        scopes: 'Permissions'
    },
    FORM: {
        name: "Permission Identifier",
        description: "Description",
        scopeRoles: "Profiles related to this Permission",
        choices: "Profiles available",
        selected: "Profiles where it is applied",
        updatedAt: "Updated At",
        createdAt: "Registered At",
        saveButton: "Save"
    },
    MESSAGES: {
        nameTooBig: "Identifier is too big. Max characters: {{max}}",
        nameRequired: "Permission Identifier is required",
        descriptionTooBig: "Description is too big. Max characters: {{max}}",
        descriptionRequired: "Permission Description is required",
        scopeUpdatedSuccessfully: "The permission with the identifier {{scopeName}} was updated successfully",
        scopeCreatedSuccessfully: "The permission with the identifier {{scopeName}} was created successfully",
        scopeGeneralError: "Error creating/updating permission with the identifier {{scopeName}}. Please try again",
        scopeNotFound: "The permission with the identifier {{scopeName}} wasn't found. Please double check if the name is correct"
    }
});
//# sourceMappingURL=ScopeDetails.js.map