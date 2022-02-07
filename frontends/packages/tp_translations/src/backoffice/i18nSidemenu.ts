import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";

import {SIDEMENU_TRANSLATIONS as EN_SIDEMENU_TRANSLATIONS} from '../consts/Translations/en/backoffice/Menus/sidemenu';
import {SIDEMENU_TRANSLATIONS as PT_SIDEMENU_TRANSLATIONS} from '../consts/Translations/pt/backoffice/Menus/sidemenu';

export const i18nextSidemenu = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_SIDEMENU_TRANSLATIONS
        },
        pt: {
            translation: PT_SIDEMENU_TRANSLATIONS
        }
    }
});