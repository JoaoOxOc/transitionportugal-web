import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";
import { REGISTER_TRANSLATIONS as EN_REGISTER_TRANSLATIONS } from '../consts/Translations/en/backoffice/Auth/register';
import { REGISTER_TRANSLATIONS as PT_REGISTER_TRANSLATIONS } from '../consts/Translations/pt/backoffice/Auth/register';
export var i18nextRegister = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_REGISTER_TRANSLATIONS
        },
        pt: {
            translation: PT_REGISTER_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nRegister.js.map