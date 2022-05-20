import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";

import {STAFF_TRANSLATIONS as EN_STAFF_TRANSLATIONS} from '../consts/Translations/en/home/Components/staff';
import {STAFF_TRANSLATIONS as PT_STAFF_TRANSLATIONS} from '../consts/Translations/pt/home/Components/staff';

export const i18nextStaff = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_STAFF_TRANSLATIONS
        },
        pt: {
            translation: PT_STAFF_TRANSLATIONS
        }
    }
});