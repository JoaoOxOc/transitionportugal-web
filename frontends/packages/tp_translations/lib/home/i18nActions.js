import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";
import { ACTIONS_TRANSLATIONS as EN_ACTIONS_TRANSLATIONS } from '../consts/Translations/en/home/Components/actions';
import { ACTIONS_TRANSLATIONS as PT_ACTIONS_TRANSLATIONS } from '../consts/Translations/pt/home/Components/actions';
export var i18nextActions = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_ACTIONS_TRANSLATIONS
        },
        pt: {
            translation: PT_ACTIONS_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nActions.js.map