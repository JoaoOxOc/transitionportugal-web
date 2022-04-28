import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { TERMSLIST_TRANSLATIONS as EN_TERMSLIST_TRANSLATIONS } from '../../consts/Translations/en/backoffice/Terms/TermsList';
import { TERMSLIST_TRANSLATIONS as PT_TERMSLIST_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/Terms/TermsList';
export var i18nextTermsList = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_TERMSLIST_TRANSLATIONS
        },
        pt: {
            translation: PT_TERMSLIST_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nTermsList.js.map