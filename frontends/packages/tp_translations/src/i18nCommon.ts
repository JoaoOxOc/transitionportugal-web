import { i18nCreateInstanceSync } from "./utils/i18nCreateInstance";

import {TRANSLATIONS as EN_COMMON_TRANSLATIONS} from './consts/Translations/en/Common';
import {TRANSLATIONS as PT_COMMON_TRANSLATIONS} from './consts/Translations/pt/Common';

export const i18nextCommon = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_COMMON_TRANSLATIONS
        },
        pt: {
            translation: PT_COMMON_TRANSLATIONS
        }
    }
});