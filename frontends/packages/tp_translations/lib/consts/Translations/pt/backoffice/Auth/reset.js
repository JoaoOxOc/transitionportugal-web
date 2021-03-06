import * as deepFreeze from 'deep-freeze';
export var RESET_TRANSLATIONS = deepFreeze({
    LABELS: {
        pageTitle: "Definir Palavra-passe - Transição Portugal",
        title: "Definir Palavra-passe",
        subtitle: "Insira uma nova palavra-passe para a sua conta.",
        closeMessage: "Fechar Mensagem de Sucesso",
        buttonToLogin: "Botão de link para a página de autenticação",
        recoverMessage: "Aceda ao seguinte link para recuperar novamente a sua palavra-passe: ",
        recoverPassword: "Recuperar Palavra-passe",
        goBackToRecover: "Link para a página de recuperação da palavra-passe",
        goLogIn: "Continuar para a autenticação"
    },
    FORMS: {
        submitNewPassword: "Redefinir Palavra-passe",
        password: "Palavra-passe",
        password_help: "Insira a sua nova palavra-passe",
        confirmPassword: "Confirmar Palavra-passe",
        confirm_password_help: "Repita a sua nova palavra-passe",
        submit_help: "Este formulário submete a sua nova palavra-passe para a sua conta registada",
        resetErrorResult: "apresenta a mensagem de erro quando a recuperação Palavra-passe falha"
    },
    MESSAGES: {
        passwordRequired: "A palavra-passe é obrigatória",
        passwordTooSmall: "A tua palavra-passe tem de ter pelo menos {{number}} caracteres",
        passwordTooBig: "A tua palavra-passe não pode ter mais do que {{number}} caracteres",
        passwordsNoMatch: "As palavras-passe inseridas têm de ser idênticas",
        confirmPasswordRequired: "Por favor confirma a tua palavra-passe inserida",
        tokenExpiredError: "O seu pedido de recuperação expirou. Por favor requisite novamente a recuperação da palavra-passe.",
        userNotFoundError: "A sua conta não foi encontrada. Por favor contacte a Transição Portugal para obter ajuda.",
        passwordComplexityError: "A sua nova palavra-passe tem de conter, pelo menos, 1 símbolo, 1 número, 1 letra maiúscula e outra minúscula.",
        passwordReset: "Palavra-passe alterada.",
        successMessage: "Pode agora proceder para autenticação e utilizar a sua nova palavra-passe",
        userResetError: "Ocorreu um erro ao contactar o serviço. Por favor tente novamente. Se o problema persistir por favor contacte o administrador da plataforma"
    }
});
//# sourceMappingURL=reset.js.map