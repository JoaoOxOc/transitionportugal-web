import { i18nCreateInstanceSync } from "./utils/i18nCreateInstance";

import {TRANSLATIONS as EN_HEADER_TRANSLATIONS} from './consts/Translations/en/Header';
import {TRANSLATIONS as PT_HEADER_TRANSLATIONS} from './consts/Translations/pt/Header';

export const i18nextHeader = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_HEADER_TRANSLATIONS
        },
        pt: {
            translation: PT_HEADER_TRANSLATIONS
        }
    }
});