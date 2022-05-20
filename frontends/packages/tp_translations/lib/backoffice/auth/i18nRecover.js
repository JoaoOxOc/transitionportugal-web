import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { RECOVER_TRANSLATIONS as EN_RECOVER_TRANSLATIONS } from '../../consts/Translations/en/backoffice/Auth/recover';
import { RECOVER_TRANSLATIONS as PT_RECOVER_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/Auth/recover';
export var i18nextRecover = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_RECOVER_TRANSLATIONS
        },
        pt: {
            translation: PT_RECOVER_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nRecover.js.map