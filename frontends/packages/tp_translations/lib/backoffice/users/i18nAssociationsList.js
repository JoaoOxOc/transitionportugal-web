import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { ASSOCIATIONSLIST_TRANSLATIONS as EN_ASSOCIATIONSLIST_TRANSLATIONS } from '../../consts/Translations/en/backoffice/User/AssociationsList';
import { ASSOCIATIONSLIST_TRANSLATIONS as PT_ASSOCIATIONSLIST_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/User/AssociationsList';
export var i18nextAssociationsList = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_ASSOCIATIONSLIST_TRANSLATIONS
        },
        pt: {
            translation: PT_ASSOCIATIONSLIST_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nAssociationsList.js.map