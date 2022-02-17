import * as deepFreeze from 'deep-freeze';
export var RESET_TRANSLATIONS = deepFreeze({
    LABELS: {
        pageTitle: "Set Password - Transição Portugal",
        title: "Set New Password",
        subtitle: "Insert a new password for your account.",
        closeMessage: "Close Success Message",
        buttonToLogin: "Button link to login page",
        recoverMessage: "Access the following link to recover your password again: ",
        recoverPassword: "Recover Password",
        goBackToRecover: "Link to recover password page",
        goLogIn: "Continue to login"
    },
    FORMS: {
        submitNewPassword: "Reset Password",
        password: "Password",
        password_help: "Insert your new password",
        confirmPassword: "Confirm Password",
        confirm_password_help: "Repeat your new password",
        submit_help: "This form submits a new password to your registered account"
    },
    MESSAGES: {
        passwordRequired: "The password field is required",
        passwordTooSmall: "Password must be at least {{number}} characters",
        passwordTooBig: "Your password cannot have more than {{number}} characters",
        passwordsNoMatch: "Both password fields need to be the same",
        confirmPasswordRequired: "Please confirm your inserted password",
        tokenExpiredError: "Your reset request is expired. Please request again the password recovery.",
        userNotFoundError: "Your account was not found. Please contact Transição Portugal for help.",
        passwordComplexityError: "Your new password must contain a non alphanumeric character, a number, an uppercase and a lowercase.",
        passwordReset: "Password Changed.",
        successMessage: "You can now proceed for authentication and use it",
    }
});
//# sourceMappingURL=reset.js.map