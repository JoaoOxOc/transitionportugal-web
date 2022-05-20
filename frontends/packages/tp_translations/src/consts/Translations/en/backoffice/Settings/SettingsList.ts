import * as deepFreeze from 'deep-freeze';

export const SETTINGSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        emailSettings: "Email Settings Management",
        emailTemplatesSettings: "Email Templates Management",
        userAuthSettings: "Authentication/Authorization Management",
        noSettingsFound: "We couldn't find any settings matching your search criteria",
        chooseGrid: "Choose between table or grid views for displaying the users list.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing"
    },
    LIST: {
        emailSettingsTitle: "Email Sending Settings",
        userSettingsTitle: "Authentication Settings"
    },
    SETTINGOBJECT: {
        description: "Description",
        key: "Key",
        defaultValue: "Default Value",
        value: "Value"
    },
    MESSAGES: {
        emailSettingsDescription: "All aspects related to sending emails can be managed from this page",
        userAuthSettingsDescription: "All aspects related to authentication/authroization settings can be managed from this page"
    },
    SEARCH: {
        searchByKeyPlaceholder: "Search by description or key..."
    },
    ACTIONS: {
        testEmailSend: "Test Email Send",
        sendToEmailField: "Insert the Recipient Email",
        testSendEmailButton: "Test Email Send",
        sendEmailResult: "Test result",
        closeTestEmailSendDialog: "Close Test Send Email Popup",
        cancelTestEmailSendButton: "Close",
        testSendSuccess: "Email sent successfully to '{{sendToEmail}}'. Check it's inbox"
    }
} as const);