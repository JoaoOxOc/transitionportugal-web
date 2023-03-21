import * as deepFreeze from 'deep-freeze';

export const CONTACTS_TRANSLATIONS = deepFreeze({
    CONTACTS: {
        email_input_label: "Email",
        email_input_help: "Insira o email onde irá receber a newsletter",
        email_input_placeholder: "O seu email...",
        subscribe_button: "Subscrever"
    },
    LABELS: {
        contactUsTitle: "Contacte-nos",
        contactUsMessage: "Tem dúvidas sobre o movimento transição? Por favor envie-nos uma mensagem e tentaremos esclarecer as suas dúvidas"
    },
    FORMS: {
        emailFrom: "O seu Email",
        emailFrom_help: "Insira o email que iremos usar para o contactar",
        fromName: "O seu Nome",
        fromName_help: "Insira o nome que o identificará na nossa tentativa de o contactar",
        messageSubject: "Assunto",
        messageSubject_help: "Insira o assunto em causa para esta mensagem",
        messageBody: "Mensagem",
        messageBody_help: "Insira a mensagem que nos deseja transmitir",
        sendButton: "Enviar",
        submit_help: "Este botão irá enviar a mensagem de contacto com os dados inseridos"
    },
    MESSAGES: {
        fromEmailInvalid: "O email que inseriu não é válido",
        fromEmailRequired: "Por favor indique-nos o seu email para o contactar",
        fromNameRequired: "Por favor indique-nos o seu nome",
        messageSubjectRequired: "Por favor indique-nos o seu assunto",
        messageBodyRequired: "Por favor escreva-nos uma mensagem",
        messageSent: "Grato, mensagem enviada. Tentaremos responder o mais brevemente possível.",
        messageSentResult: "Apresenta a mensagem de sucesso no envio da mensagem",
        messageSentError: "Ocorreu um erro ao enviar a mensagem. Por favor tente novamente. Se o problema persistir, por favor entre em contacto connosco por outros meios.",
        messageSentErrorResult: "Apresenta a mensagem de erro, caso falhe o envio da mensagem"
    }
} as const);