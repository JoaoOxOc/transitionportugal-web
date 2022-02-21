import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";
import { ABOUT_TRANSLATIONS as EN_ABOUT_TRANSLATIONS } from '../consts/Translations/en/home/Components/about';
import { ABOUT_TRANSLATIONS as PT_ABOUT_TRANSLATIONS } from '../consts/Translations/pt/home/Components/about';
export var i18nextAbout = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_ABOUT_TRANSLATIONS
        },
        pt: {
            translation: PT_ABOUT_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nAbout.js.map