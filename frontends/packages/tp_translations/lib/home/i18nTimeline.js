import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";
import { TIMELINE_TRANSLATIONS as EN_TIMELINE_TRANSLATIONS } from '../consts/Translations/en/home/Components/timeline';
import { TIMELINE_TRANSLATIONS as PT_TIMELINE_TRANSLATIONS } from '../consts/Translations/pt/home/Components/timeline';
export var i18nextTimeline = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_TIMELINE_TRANSLATIONS
        },
        pt: {
            translation: PT_TIMELINE_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nTimeline.js.map