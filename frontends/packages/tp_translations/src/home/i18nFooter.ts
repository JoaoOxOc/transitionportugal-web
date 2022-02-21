import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";

import {TRANSLATIONS as EN_FOOTER_TRANSLATIONS} from '../consts/Translations/en/home/Footer';
import {TRANSLATIONS as PT_FOOTER_TRANSLATIONS} from '../consts/Translations/pt/home/Footer';

export const i18nextFooter = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_FOOTER_TRANSLATIONS
        },
        pt: {
            translation: PT_FOOTER_TRANSLATIONS
        }
    }
});