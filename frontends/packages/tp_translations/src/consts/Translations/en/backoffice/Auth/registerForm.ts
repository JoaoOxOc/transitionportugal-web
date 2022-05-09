import * as deepFreeze from 'deep-freeze';

export const REGISTERFORM_TRANSLATIONS = deepFreeze({
    LABELS: {
        accept: "I accept the",
        terms: "terms and conditions",
        acceptTerms: "I accept the terms and conditions",
        nextStep: "Next Step",
        previous: "Previous",
        completeRegist: "Complete registration",
        submitting: "Submitting",
        step1Title: "Representative Information",
        step2Title: "Initiative/movement Information",
        step3Title: "Complete Registration",
        buttonToLogin: "Button link to login page",
        goLogIn: "Continue to login"
    },
    FORMS: {
        emailAddress: "Email address",
        emailAddress_help: "Insert your email address to be used on your webapp's account",
        usernameOrEmailAddress: "Username/Email",
        firstName: "First Name",
        firstName_help: "Your first name field",
        lastName: "Last Name",
        lastName_help: "Your last name field",
        username: "Username",
        username_help: "Insert your username to be used on authentication through the webapp",
        password: "Password",
        password_help: "Insert your password to be used on authentication through the webapp",
        confirmPassword: "Confirm Password",
        confirmPassword_help: "Insert again your password to confirm it",
        confirmTerms: "Checkbox to confirm that you agree to the terms of the webapp",
        confirmTerms_help: "Checks that you agree with the terms. You can read them through the popup link right besides this",
        confirmTermsPopup: "Link that opens the popup for terms reading",
        associationName: "Initiative/movement Name",
        associationEmail: "Initiative/movement Email",
        associationVat: "Initiative/movement VAT Number",
        associationAddress: "Initiative/movement Street Address",
        associationTown: "Initiative/movement Town",
    },
    PLACEHOLDER: {
        firstName: "Write your first name here...",
        lastName: "Write your last name here...",
        emailAddress: "Write your email address here...",
        username: "Write your username for auth here...",
        password: "Write a password for auth here...",
        confirmPassword: "Confirm the password here..."
    },
    MESSAGES: {
        loginError: "Username/Email/password are incorrect!",
        emailInvalid: "The email provided should be a valid email address",
        emailRequired: "The email field is required",
        emailTooBig: "The email address cannot have more than {{number}} characters",
        emailAlreadyTaken: "The inserted email is already taken",
        firstNameTooBig: "Your first name cannot have more than {{number}} characters",
        firstNameRequired: "Your first name is required",
        lastNameTooBig: "Your last name cannot have more than {{number}} characters",
        lastNameRequired: "Your last name is required",
        usernameTooBig: "Your username cannot have more than {{number}} characters",
        usernameRequired: "The Username is required",
        usernameEmailRequired: "Username or Email is required",
        usernameAlreadyTaken: "The inserted username is already taken",
        passwordRequired: "The password field is required",
        passwordTooSmall: "Password must be at least {{number}} characters",
        passwordTooBig: "Your password cannot have more than {{number}} characters",
        passwordsNoMatch: "Both password fields need to be the same",
        passwordComplexityError: "Your new password must contain a non alphanumeric character, a number, an uppercase and a lowercase.",
        confirmPasswordRequired: "Please confirm your inserted password",
        termsRequired: "You must agree to our terms and conditions",
        associationEmailInvalid: "The email provided should be a valid email address",
        associationEmailRequired: "The email field is required",
        associationEmailTooBig: "The email address cannot have more than {{number}} characters",
        associationEmailAlreadyTaken: "The inserted email is already taken",
        associationNameTooBig: "Your Initiative/movement name cannot have more than {{number}} characters",
        associationNameRequired: "Your Initiative/movement name is required",
        associationVatTooBig: "Your Initiative/movement VAT Number cannot have more than {{number}} characters",
        associationVatAlreadyTaken: "The inserted VAT Number is already taken",
        associationVatInvalid: "The inserted VAT Number is not an EU valid VAT",
        associationAddressTooBig: "Your Initiative/movement street address cannot have more than {{number}} characters",
        associationTownTooBig: "Your Initiative/movement town cannot have more than {{number}} characters",
        associationTownRequired: "Your Initiative/movement town is required",
        confirmationEmailSent: "An email confirmation request was sent to each email",
        serverError: "An unknown error ocurred. Please try again",
        successfulMessage: "Thank you for registering. Your account will now be verified. Please check your email for more instructions"
    }
} as const);