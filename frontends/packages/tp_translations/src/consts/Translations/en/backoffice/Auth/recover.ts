import * as deepFreeze from 'deep-freeze';

export const RECOVER_TRANSLATIONS = deepFreeze({
    LABELS: {
        pageTitle: "Recover Password - Transição Portugal",
        title: "Recover Password",
        subtitle: "Fill in your username or email to recover your account.",
        closeMessage: "Close Success Message",
        buttonToLogin: "Button link to login page",
        signInLabel: "Want to try to sign in again?",
        signIn: "Click here",
        goLogIn: "Continue to login"
    },
    FORMS: {
        usernameOrEmailAddress: "Username/Email",
        recoverAccount: "Recover Password",
        usernameOrEmailAddress_help: "Insert your account's email or username to be used for password recovery process",
        submit_help: "This form starts a new password recovery process, sending instructions to your account email",
        recoverErrorResult: "Shows the error message in case the user recover fails"
    },
    MESSAGES: {
        usernameTooBig: "Your username cannot have more than {{number}} characters",
        usernameRequired: "The Username is required",
        usernameEmailRequired: "Username or Email is required",
        userNotFoundError: "Your account was not found. Please contact Transição Portugal for help.",
        passwordResetInstructions: "The password reset instructions have been sent to your email",
        successMessage: "Check your email for further instructions",
        userRecoverError: "Error contacting the server. Please try again. If the problem persists contact the web administrator",

    }
} as const);