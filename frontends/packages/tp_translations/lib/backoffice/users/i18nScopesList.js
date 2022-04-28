import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { SCOPESLIST_TRANSLATIONS as EN_SCOPESLIST_TRANSLATIONS } from '../../consts/Translations/en/backoffice/User/ScopesList';
import { SCOPESLIST_TRANSLATIONS as PT_SCOPESLIST_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/User/ScopesList';
export var i18nextScopesList = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_SCOPESLIST_TRANSLATIONS
        },
        pt: {
            translation: PT_SCOPESLIST_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nScopesList.js.map