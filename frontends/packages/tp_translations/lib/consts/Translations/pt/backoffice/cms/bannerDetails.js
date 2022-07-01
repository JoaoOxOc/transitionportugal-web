import * as deepFreeze from 'deep-freeze';
export var BANNERDETAILS_TRANSLATIONS = deepFreeze({
    LABELS: {
        bannerDetails: "Detalhes do Banner - {{name}}",
        bannerCreate: "Registar Novo Banner",
        bannerCreateSmall: "Registar Novo Banner",
        bannerIdentificationSmall: "Banner: {{bannerIdentification}}",
        goBack: "Voltar",
        registerBannerInfo: "O visual de edição não é equivalente ao que o utilizador irá ver",
        bannerWarning: "Atenção à edição das chaves de identificação da página e do componente: o banner pode deixar de funcionar na página onde está actualmente activo"
    },
    LIST: {
        bannersTitle: "Banners",
        home: "Home",
        cms: "Conteúdo do Website",
        banners: 'Banners',
        bannersTitleRoot: "Banners na raíz",
        bannersTitleSubPath: "Banners sub-caminho {{bannersLevel}}",
        bannersSubPathLevel: "nível {{levelNumber}}",
        bannersSortedPosition: "Posição ordenada: {{positionNumber}}"
    },
    TABS: {
        main: "Dados do Banner",
        relatedBanners: "Lista de Relacionados"
    },
    FORM: {
        language: "Linguagem",
        selectLanguage: "Linguagem do banner: a edição abaixo corresponde à Linguagem seleccionada",
        editorPlaceholder: "Comece a escrever aqui, as opções de edição irão aparecer...",
        isActive: "Activo",
        DataBlocksJson: "Conteúdo do Banner",
        pageKey: "Identificador Chave da Página",
        componentKey: "Identificador Chave do Componente",
        orderPosition: "Posição Ordenada do Componente",
        createdAt: "Registado em",
        updatedAt: "Actualizado em",
        saveButton: "Guardar"
    },
    MESSAGES: {
        pageKeyTooBig: "O Identificador Chave da Página é demasiado grande. Máx. de caracteres: {{max}}",
        pageKeyRequired: "O Identificador Chave da Página é obrigatório",
        componentKeyTooBig: "O Identificador Chave do Componente é demasiado grande. Máx. de caracteres: {{max}}",
        componentKeyRequired: "O Identificador Chave do Componente é obrigatório",
        orderPositionTooBig: "A Posição Ordenada do Componente é demasiado grande. Valor máx.: {{max}}",
        orderPositionRequired: "A Posição Ordenada do Componente é obrigatória",
        orderPositionMustBePositive: "A Posição Ordenada do Componente tem de ser 0 ou acima de",
        bannerUpdatedSuccessfully: "O Banner cuja identificação é {{bannerIdentification}} foi atualizado com sucesso",
        bannerCreatedSuccessfully: "O Banner cuja identificação é {{bannerIdentification}} foi registado com sucesso",
        bannerGeneralError: "Erro ao registar/atualizar o Banner cuja identificação é {{bannerIdentification}}. Por favor tente novamente",
        bannerNotFound: "O Banner cuja identificação é {{bannerIdentification}} não foi encontrado. Por favor verifica se a identificação está correcta",
        bannerDuplicateFound: "Um Banner com a mesma posição ordenada {{orderPosition}} já se encontra registado. Por favor altere a ordem e grave novamente"
    }
});
//# sourceMappingURL=bannerDetails.js.map