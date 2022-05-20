import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { USERDETAILS_TRANSLATIONS as EN_USERDETAILS_TRANSLATIONS } from '../../consts/Translations/en/backoffice/User/UserDetails';
import { USERDETAILS_TRANSLATIONS as PT_USERDETAILS_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/User/UserDetails';
export var i18nextUserDetails = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_USERDETAILS_TRANSLATIONS
        },
        pt: {
            translation: PT_USERDETAILS_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nUserDetails.js.map