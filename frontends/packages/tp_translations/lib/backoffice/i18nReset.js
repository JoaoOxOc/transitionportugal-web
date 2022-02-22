import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";
import { RESET_TRANSLATIONS as EN_RESET_TRANSLATIONS } from '../consts/Translations/en/backoffice/Auth/reset';
import { RESET_TRANSLATIONS as PT_RESET_TRANSLATIONS } from '../consts/Translations/pt/backoffice/Auth/reset';
export var i18nextReset = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_RESET_TRANSLATIONS
        },
        pt: {
            translation: PT_RESET_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nReset.js.map