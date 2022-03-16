import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";
import { PAGE403_TRANSLATIONS as EN_PAGE403_TRANSLATIONS } from '../consts/Translations/en/backoffice/Status/403page';
import { PAGE403_TRANSLATIONS as PT_PAGE403_TRANSLATIONS } from '../consts/Translations/pt/backoffice/Status/403page';
export var i18nextPage403 = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_PAGE403_TRANSLATIONS
        },
        pt: {
            translation: PT_PAGE403_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nPage403.js.map