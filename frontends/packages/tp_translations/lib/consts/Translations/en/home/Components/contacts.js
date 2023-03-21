import * as deepFreeze from 'deep-freeze';
export var CONTACTS_TRANSLATIONS = deepFreeze({
    CONTACTS: {
        email_input_label: "Email",
        email_input_help: "Insert the email where you will receive the newsletter",
        email_input_placeholder: "Your email...",
        subscribe_button: "Subscribe"
    },
    LABELS: {
        contactUsTitle: "Contact Us",
        contactUsMessage: "Have doubts about the Transition Movement? Please send us a message and we will try to clarify them"
    },
    FORMS: {
        emailFrom: "Your Email",
        emailFrom_help: "Insert the email that we will use to contact you",
        fromName: "Your Name",
        fromName_help: "Insert your name for us to identify on a contact attempt",
        messageSubject: "Subject",
        messageSubject_help: "Insert the subject of this message",
        messageBody: "Message",
        messageBody_help: "Insert the message that you want to transmit to us",
        sendButton: "Send",
        submit_help: "This button will send the contact message with the inserted data"
    },
    MESSAGES: {
        fromEmailInvalid: "The inserted email is invalid",
        fromEmailRequired: "Please insert the email to contact you",
        fromNameRequired: "Please indicate your name",
        messageSubjectRequired: "Please insert this message subject",
        messageBodyRequired: "Please write a message to us",
        messageSent: "Thank you, message sent. We will try to answer as soon as possible.",
        messageSentResult: "Displays the success message in case that the message was sent",
        messageSentError: "An error occured while sending the message. Please try again. If the problem persists, please reach out to us through another channel.",
        messageSentErrorResult: "Displays the error message in case the message send fails"
    }
});
//# sourceMappingURL=contacts.js.map