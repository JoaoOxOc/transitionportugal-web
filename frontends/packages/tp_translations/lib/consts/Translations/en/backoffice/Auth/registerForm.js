import * as deepFreeze from 'deep-freeze';
export var REGISTERFORM_TRANSLATIONS = deepFreeze({
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
        step3Title: "Complete Registration"
    },
    FORMS: {
        emailAddress: "Email address",
        usernameOrEmailAddress: "Username/Email",
        firstName: "First Name",
        lastName: "Last Name",
        username: "Username",
        password: "Password",
        confirmPassword: "Confirm Password"
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
        confirmPasswordRequired: "Please confirm your inserted password",
        termsRequired: "You must agree to our terms and conditions"
    }
});
//# sourceMappingURL=registerForm.js.map