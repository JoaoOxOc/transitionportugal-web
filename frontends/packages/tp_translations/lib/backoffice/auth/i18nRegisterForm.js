import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { REGISTERFORM_TRANSLATIONS as EN_REGISTERFORM_TRANSLATIONS } from '../../consts/Translations/en/backoffice/Auth/registerForm';
import { REGISTERFORM_TRANSLATIONS as PT_REGISTERFORM_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/Auth/registerForm';
export var i18nextRegisterForm = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_REGISTERFORM_TRANSLATIONS
        },
        pt: {
            translation: PT_REGISTERFORM_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nRegisterForm.js.map