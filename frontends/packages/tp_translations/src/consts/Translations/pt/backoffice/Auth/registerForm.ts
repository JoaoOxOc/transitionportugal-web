import * as deepFreeze from 'deep-freeze';

export const REGISTERFORM_TRANSLATIONS = deepFreeze({
    LABELS: {
        accept: "Eu aceito os",
        terms: "termos e condições",
        acceptTerms: "Eu aceito os termos e condições",
        nextStep: "Próximo Passo",
        previous: "Anterior",
        completeRegist: "Concluir registo",
        submitting: "A submeter",
        step1Title: "Informação do Representante",
        step2Title: "Informação da Iniciativa/Movimento",
        step3Title: "Concluir registo"
    },
    FORMS: {
        emailAddress: "Endereço de Email",
        usernameOrEmailAddress: "Username/Email",
        username: "Username",
        firstName: "Nome",
        lastName: "Apelido",
        password: "Palavra-passe",
        confirmPassword: "Confirma a Palavra-passe"
    },
    PLACEHOLDER: {
        firstName: "Escreve o teu primeiro nome aqui...",
        lastName: "Escreve o teu apelido aqui...",
        emailAddress: "Escreve o teu endereço de email aqui...",
        username: "Escreve o teu username para autenticação aqui...",
        password: "Escreve a tua palavra-passe para autenticação aqui...",
        confirmPassword: "Confirma a tua palavra-passe aqui..."
    },
    MESSAGES: {
        loginError: "Username/Email/Palavra-passe incorrectos!",
        emailInvalid: "O email fornecido deverá ser um endereço de email válido",
        emailRequired: "O Email é obrigatório",
        emailTooBig: "O Email não pode ter mais do que {{number}} caracteres",
        emailAlreadyTaken: "O email inserido já está a ser utilizado",
        firstNameTooBig: "O teu nome não pode ter mais do que {{number}} caracteres",
        firstNameRequired: "O teu nome é obrigatório",
        lastNameTooBig: "O teu apelido não pode ter mais do que {{number}} caracteres",
        lastNameRequired: "O teu apelido é obrigatório",
        usernameTooBig: "Username não pode ter mais do que {{number}} caracteres",
        usernameRequired: "Username é obrigatório",
        usernameEmailRequired: "Username ou o Email é obrigatório",
        usernameAlreadyTaken: "O username inserido já está a ser utilizado",
        passwordRequired: "A palavra-passe é obrigatória",
        passwordTooSmall: "A tua palavra-passe tem de ter pelo menos {{number}} caracteres",
        passwordTooBig: "A tua palavra-passe não pode ter mais do que {{number}} caracteres",
        passwordsNoMatch: "As palavras-passe inseridas têm de ser idênticas",
        confirmPasswordRequired: "Por favor confirma a tua palavra-passe inserida",
        termsRequired: "Por favor aceite os nossos termos e condições"
    }
} as const);