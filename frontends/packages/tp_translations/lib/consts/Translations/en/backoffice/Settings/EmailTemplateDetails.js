import * as deepFreeze from 'deep-freeze';
export var EMAILTEMPLATEDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        emailTemplateDetails: "Email Template Details",
        emailTemplateEditor: "Email Template Editor - {{name}}",
        goBack: "Go back",
        emailTemplateWarning: "Careful with subject and body parameters (inside \"{{}}\"): it can cause the email data to not be correctly processed"
    },
    LIST: {
        emailTemplatesTitle: "Email Templates",
        userSettingsTitle: "Authentication",
        home: "Home",
        settings: 'Settings'
    },
    FORM: {
        key: "Email Template Key",
        templateLanguage: "Email Template Language",
        description: "Description",
        subject: "Email Template Subject",
        bodyMessage: "View/Edit Email Template body",
        bodyEditorLink: "Go to Editor",
        saveButton: "Save"
    },
    MESSAGES: {
        valueTooBig: "Value is too big. Max characters: {{max}}",
        valueRequired: "Email Template Value is required",
        descriptionTooBig: "Description is too big. Max characters: {{max}}",
        descriptionRequired: "Email Template Description is required",
        templateUpdatedSuccessfully: "The Email Template with key {{templateKey}} was updated successfully",
        templateGeneralError: "Error updating Email Template with key {{templateKey}}. Please try again",
        templateNotFound: "The Email Template with key {{templateKey}} wasn't found. Please double check if the key is correct"
    }
});
//# sourceMappingURL=EmailTemplateDetails.js.map