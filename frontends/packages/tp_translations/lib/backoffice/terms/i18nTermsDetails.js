import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { TERMSDETAILS_TRANSLATIONS as EN_TERMDETAILS_TRANSLATIONS } from '../../consts/Translations/en/backoffice/Terms/TermsDetails';
import { TERMSDETAILS_TRANSLATIONS as PT_TERMDETAILS_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/Terms/TermsDetails';
export var i18nextTermsDetails = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_TERMDETAILS_TRANSLATIONS
        },
        pt: {
            translation: PT_TERMDETAILS_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nTermsDetails.js.map