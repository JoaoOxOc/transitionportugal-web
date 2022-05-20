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
        step3Title: "Concluir registo",
        buttonToLogin: "Botão de link para a página de autenticação",
        goLogIn: "Continuar para a autenticação",
        closeTermsDialog: "Fechar leitura dos Termos & Condições",
        termsConsentButton: "Consentir",
        termsCancelButton: "Fechar"
    },
    FORMS: {
        emailAddress: "Endereço de Email",
        emailAddress_help: "Insere o teu endereço de email a ser usado pela tua conta na aplicação",
        usernameOrEmailAddress: "Username/Email",
        username: "Username",
        username_help: "Insere o teu username que será usado no processo de autenticação na aplicação",
        firstName: "Nome",
        firstName_help: "Campo para preencher o teu primeiro nome",
        lastName: "Apelido",
        lastName_help: "Campo para preencher o teu apelido",
        password: "Palavra-passe",
        password_help: "Insere a tua Palavra-passe que será usada no processo de autenticação na aplicação",
        confirmPassword: "Confirma a Palavra-passe",
        confirmPassword_help: "Insere novamente a tua Palavra-passe por forma a confirmá-la",
        confirmTerms: "Caixa de confirmação de que concordas com os termos de uso da aplicação",
        confirmTerms_help: "Valida que concordas com os termos de uso. Podes consultá-los através do link para o popup de leitura dos mesmos à frente desta caixa de verificação",
        confirmTermsPopup: "Link que abre o popup para consulta dos termos de uso",
        associationName: "Nome da Iniciativa/Movimento",
        associationEmail: "Email da Iniciativa/Movimento",
        associationVat: "NIF da Iniciativa/Movimento",
        associationAddress: "Morada da Iniciativa/Movimento",
        associationTown: "Concelho da Iniciativa/Movimento",
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
        passwordComplexityError: "A sua palavra-passe tem de conter, pelo menos, 1 símbolo, 1 número, 1 letra maiúscula e outra minúscula.",
        confirmPasswordRequired: "Por favor confirma a tua palavra-passe inserida",
        termsRequired: "Por favor aceite os nossos termos e condições",
        associationEmailInvalid: "O email fornecido deverá ser um endereço de email válido",
        associationEmailRequired: "O Email é obrigatório",
        associationEmailTooBig: "O Email não pode ter mais do que {{number}} caracteres",
        associationEmailAlreadyTaken: "O email inserido já está a ser utilizado",
        associationNameTooBig: "O nome da Iniciativa/Movimento não pode ter mais do que {{number}} caracteres",
        associationNameRequired: "O nome da Iniciativa/Movimento é obrigatório",
        associationVatTooBig: "O NIF da Iniciativa/Movimento não pode ter mais do que {{number}} caracteres",
        associationVatAlreadyTaken: "O NIF inserido já está a ser utilizado",
        associationVatInvalid: "O NIF inserido não é um NIF válido na UE",
        associationAddressTooBig: "O endereço da Iniciativa/Movimento não pode ter mais do que {{number}} caracteres",
        associationTownTooBig: "O concelho da Iniciativa/Movimento não pode ter mais do que {{number}} caracteres",
        associationTownRequired: "O concelho da Iniciativa/Movimento é obrigatório",
        confirmationEmailSent: "O pedido de confirmação do email foi enviado para cada um dos emails",
        serverError: "Ocorreu um erro desconhecido. Por favor tente novamente",
        successfulMessage: "Obrigado pelo teu registo. Os teus dados estão agora a ser verificados. Por favor aguarda por um email com mais instruções"
    }
} as const);