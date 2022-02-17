import * as deepFreeze from 'deep-freeze';

export const LOGINFORM_TRANSLATIONS = deepFreeze({
    LABELS: {
        accept: "I accept the",
        terms: "terms and conditions",
        acceptTerms: "I accept the terms and conditions",
        lostPassword: "Lost password?",
        signInHere: "Sign in",
        checkConfirmTerms: "Checkbox for your confirmation of the terms of using this webapp.",
        linkToReadTerms: "Link to the terms reading popup.",
        buttonToRecoverPassword: "Button link to recover password webpage."
    },
    FORMS: {
        emailAddress: "Email address",
        usernameOrEmailAddress: "Username/Email",
        usernameOrEmailAddress_help: "Insert your account's email or username as login account identifier",
        username: "Username",
        password: "Password",
        password_help: "Insert your account password",
        submit_help: "This form authenticates your account then you enter in the webapp if authenticated successfully"
    },
    MESSAGES: {
        loginError: "Username/Email/password are incorrect!",
        emailInvalid: "The email provided should be a valid email address",
        emailRequired: "The email field is required",
        usernameRequired: "The Username is required",
        usernameEmailRequired: "Username or Email is required",
        passwordRequired: "The password field is required",
        termsRequired: "You must agree to our terms and conditions"
    }
} as const);