import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { SCOPEDETAILS_TRANSLATIONS as EN_SCOPEDETAILS_TRANSLATIONS } from '../../consts/Translations/en/backoffice/User/ScopeDetails';
import { SCOPEDETAILS_TRANSLATIONS as PT_SCOPEDETAILS_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/User/ScopeDetails';
export var i18nextScopeDetails = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_SCOPEDETAILS_TRANSLATIONS
        },
        pt: {
            translation: PT_SCOPEDETAILS_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nScopeDetails.js.map